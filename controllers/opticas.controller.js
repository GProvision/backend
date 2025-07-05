import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getOpticas = async (req, res) => {
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
    // preguntar si incluye sindicato
    if (req.query?.sindicato) {
      where.sindicatos = {
        some: {
          id: Number(req.query.sindicato),
        },
      };
    }
    const opticas = await prisma.optica.findMany({
      where,
      include: {
        sindicatos: true,
      },
    });
    res.json(opticas);
  } catch (error) {
    console.error("Error fetching opticas:", error);
    res.status(500).json({ error: "Error fetching opticas" });
  }
};

export const getOpticaById = async (req, res) => {
  try {
    const { id } = req.params;
    const optica = await prisma.optica.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        sindicatos: true,
      },
    });
    res.json(optica);
  } catch (error) {
    console.error("Error fetching optica:", error);
    res.status(500).json({ error: "Error fetching optica" });
  }
};

export const createOptica = async (req, res) => {
  try {
    const { nombre, activo } = req.body;
    const optica = await prisma.optica.create({
      data: {
        nombre,
        activo: Boolean(activo),
      },
    });
    res.json(optica);
  } catch (error) {
    console.error("Error creating optica:", error);
    res.status(500).json({ error: "Error creating optica" });
  }
};

export const updateOptica = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, activo } = req.body;
    const optica = await prisma.optica.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        activo: Boolean(activo),
      },
    });
    res.json(optica);
  } catch (error) {
    console.error("Error updating optica:", error);
    res.status(500).json({ error: "Error updating optica" });
  }
};

export const deleteOptica = async (req, res) => {
  try {
    const { id } = req.params;
    const optica = await prisma.optica.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: false,
      },
    });
    res.json(optica);
  } catch (error) {
    console.error("Error deleting optica:", error);
    res.status(500).json({ error: "Error deleting optica" });
  }
};

export const restoreOptica = async (req, res) => {
  try {
    const { id } = req.params;
    const optica = await prisma.optica.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: true,
      },
    });
    res.json(optica);
  } catch (error) {
    console.error("Error restoring optica:", error);
    res.status(500).json({ error: "Error restoring optica" });
  }
};

export const addSindicatoToOptica = async (req, res) => {
  try {
    const { id } = req.params;
    const { idSindicato } = req.body;
    const optica = await prisma.optica.update({
      where: {
        id: Number(id),
      },
      data: {
        sindicatos: {
          connect: {
            id: Number(idSindicato),
          },
        },
      },
    });
    res.json(optica);
  } catch (error) {
    console.error("Error adding sindicato to optica:", error);
    res.status(500).json({ error: "Error adding sindicato to optica" });
  }
};

export const removeSindicatoFromOptica = async (req, res) => {
  try {
    const { id } = req.params;
    const { idSindicato } = req.body;
    const optica = await prisma.optica.update({
      where: {
        id: Number(id),
      },
      data: {
        sindicatos: {
          disconnect: {
            id: Number(idSindicato),
          },
        },
      },
    });
    res.json(optica);
  } catch (error) {
    console.error("Error removing sindicato from optica:", error);
    res.status(500).json({ error: "Error removing sindicato from optica" });
  }
};
