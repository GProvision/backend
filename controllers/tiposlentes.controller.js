import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getTipoLentes = async (req, res) => {
  try {
    let where = {};
    if (req.query?.activo) {
      where.activo = Boolean(req.query.activo);
    }
    if (req.query?.nombre) {
      where.nombre = {
        contains: req.query.nombre,
      };
    }
    const tipoLentes = await prisma.tipoLente.findMany({
      where,
    });
    res.json(tipoLentes);
  } catch (error) {
    console.error("Error fetching tipoLentes:", error);
    res.status(500).json({ error: "Error fetching tipoLentes" });
  }
};

export const createTipoLente = async (req, res) => {
  try {
    const { nombre, activo } = req.body;
    const tipoLente = await prisma.tipoLente.create({
      data: {
        nombre,
        activo: Boolean(activo),
      },
    });
    res.json(tipoLente);
  } catch (error) {
    console.error("Error creating tipoLente:", error);
    res.status(500).json({ error: "Error creating tipoLente" });
  }
};

export const updateTipoLente = async (req, res) => {
  try {
    const { idTipoLente, ...data } = req.body;
    const tipoLente = await prisma.tipoLente.update({
      where: {
        id: Number(idTipoLente),
      },
      data,
    });
    res.json({ tipoLente });
  } catch (error) {
    console.error("Error updating tipoLente:", error);
    res.status(500).json({ error: "Error updating tipoLente" });
  }
};

export const deleteTipoLente = async (req, res) => {
  try {
    const { idTipoLente } = req.body;
    const tipoLente = await prisma.tipoLente.update({
      where: {
        id: Number(idTipoLente),
      },
      data: {
        activo: false,
      },
    });
    res.json({ tipoLente });
  } catch (error) {
    console.error("Error deleting tipoLente:", error);
    res.status(500).json({ error: "Error deleting tipoLente" });
  }
};

export const restoreTipoLente = async (req, res) => {
  try {
    const { idTipoLente } = req.body;
    const tipoLente = await prisma.tipoLente.update({
      where: {
        id: Number(idTipoLente),
      },
      data: {
        activo: true,
      },
    });
    res.json({ tipoLente });
  } catch (error) {
    console.error("Error restoring tipoLente:", error);
    res.status(500).json({ error: "Error restoring tipoLente" });
  }
};
