import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getSindicatos = async (req, res) => {
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
    const sindicatos = await prisma.sindicato.findMany({
      where,
      include: {
        opticas: true,
      },
    });
    res.json(sindicatos);
  } catch (error) {
    console.error("Error fetching sindicatos:", error);
    res.status(500).json({ error: "Error fetching sindicatos" });
  }
};

export const getSindicatoById = async (req, res) => {
  try {
    const { id } = req.params;
    const sindicato = await prisma.sindicato.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        opticas: true,
        clientes: true,
        fichas: true,
      },
    });
    res.json(sindicato);
  } catch (error) {
    console.error("Error fetching sindicato:", error);
    res.status(500).json({ error: "Error fetching sindicato" });
  }
};

export const createSindicato = async (req, res) => {
  try {
    const { nombre, activo } = req.body;
    const sindicato = await prisma.sindicato.create({
      data: {
        nombre,
        activo: Boolean(activo),
      },
    });
    res.json(sindicato);
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || "Error creando sindicato" });
  }
};

export const updateSindicato = async (req, res) => {
  try {
    const { idSindicato, ...data } = req.body;
    const sindicato = await prisma.sindicato.update({
      where: {
        id: Number(idSindicato),
      },
      data,
    });
    res.json({ sindicato });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || "Error actualizando sindicato" });
  }
};

export const deleteSindicato = async (req, res) => {
  try {
    const { id } = req.body;
    const sindicato = await prisma.sindicato.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: false,
      },
    });
    res.json(sindicato);
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || "Error eliminando sindicato" });
  }
};

export const restoreSindicato = async (req, res) => {
  try {
    const { id } = req.body;
    const sindicato = await prisma.sindicato.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: true,
      },
    });
    res.json(sindicato);
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || "Error restaurando sindicato" });
  }
};

export const removeSindicato = async (req, res) => {
  try {
    const { id } = req.body;
    const sindicato = await prisma.sindicato.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(sindicato);
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || "Error eliminando sindicato" });
  }
};
