import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const createArmazon = async (req, res) => {
  try {
    const armazonCreated = await prisma.armazon.create({
      data: {
        ...req.body,
      },
    });
    res.json(armazonCreated);
  } catch (error) {
    console.error("Error creating armazon:", error);
    res.status(500).json({ error: error.message || "Error creating armazon" });
  }
};

export const getArmazones = async (req, res) => {
  try {
    let where = {};
    if (req.query?.activo) {
      where.activo = Boolean(req.query.activo);
    }
    if (req.query?.codigoInterno) {
      where.codigoInterno = {
        contains: req.query.codigoInterno,
      };
    }
    const armazones = await prisma.armazon.findMany({
      where,
      include: {
        lentes: true
      }
    });
    res.json(armazones);
  } catch (error) {
    console.error("Error fetching armazones:", error);
    res.status(500).json({ error: "Error fetching armazones" });
  }
};

export const getArmazonById = async (req, res) => {
  try {
    const { id } = req.params;
    const armazon = await prisma.armazon.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        lentes: true,
      },
    });
    res.json(armazon);
  } catch (error) {
    console.error("Error fetching armazon:", error);
    res.status(500).json({ error: "Error fetching armazon" });
  }
};

export const reduceArmazon = async (req, res) => {
  try {
    const { id } = req.body;
    const armazon = await prisma.armazon.update({
      where: {
        id: Number(id),
      },
      data: {
        cantidad: {
          decrement: 1,
        },
      },
    });
    if (armazon.cantidad < armazon.cantidadMinima) {
      await prisma.armazon.update({
        where: {
          id: Number(id),
        },
        data: {
          activo: false,
        },
      });
    }
    res.json(armazon);
  } catch (error) {
    console.error("Error reducing armazon:", error);
    res.status(500).json({ error: "Error reducing armazon" });
  }
};

export const updateArmazon = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const armazon = await prisma.armazon.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    });
    res.json(armazon);
  } catch (error) {
    console.error("Error updating armazon:", error);
    res.status(500).json({ error: "Error updating armazon" });
  }
};

export const deleteArmazon = async (req, res) => {
  try {
    const { id } = req.body;
    const armazon = await prisma.armazon.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: false,
      },
    });
    res.json(armazon);
  } catch (error) {
    console.error("Error deleting armazon:", error);
    res.status(500).json({ error: "Error deleting armazon" });
  }
};

export const restoreArmazon = async (req, res) => {
  try {
    const { id } = req.body;
    const armazon = await prisma.armazon.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: true,
      },
    });
    res.json(armazon);
  } catch (error) {
    console.error("Error restoring armazon:", error);
    res.status(500).json({ error: "Error restoring armazon" });
  }
};
