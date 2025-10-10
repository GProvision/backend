import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getDelegaciones = async (req, res) => {
  try {
    const delegaciones = await prisma.delegacion.findMany({
      include: {
        opticas: true,
        fichas: true,
      },
    });
    res.json(delegaciones);
  } catch (error) {
    console.error("Error fetching delegaciones:", error);
    res.status(500).json({ error: "Error fetching delegaciones" });
  }
};

export const getDelegacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const delegacion = await prisma.delegacion.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        opticas: true,
        fichas: true,
      },
    });
    res.json(delegacion);
  } catch (error) {
    console.error("Error fetching delegacion:", error);
    res.status(500).json({ error: "Error fetching delegacion" });
  }
};

export const createDelegacion = async (req, res) => {
  try {
    const delegacion = await prisma.delegacion.create({ data: req.body });
    res.json(delegacion);
  } catch (error) {
    console.error("Error creating delegacion:", error);
    res.status(500).json({ error: "Error creating delegacion" });
  }
};

export const updateDelegacion = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const delegacion = await prisma.delegacion.update({
      where: {
        id: Number(id),
      },
      data,
    });
    res.json(delegacion);
  } catch (error) {
    console.error("Error updating delegacion:", error);
    res.status(500).json({ error: "Error updating delegacion" });
  }
};

export const removeDelegacion = async (req, res) => {
  try {
    const { idDelegacion } = req.body;
    const delegacion = await prisma.delegacion.delete({
      where: {
        id: Number(idDelegacion),
      },
    });
    res.json(delegacion);
  } catch (error) {
    console.error("Error deleting delegacion:", error);
    res.status(500).json({ error: "Error deleting delegacion" });
  }
};
