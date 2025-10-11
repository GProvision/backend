import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getAll = async (req, res) => {
  try {
    const estados = await prisma.estado.findMany();
    res.json(estados);
  } catch (error) {
    console.error("Error fetching estados:", error);
    res.status(500).json({ error: error.message || "Error fetching estados" });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const estado = await prisma.estado.findUnique({
      where: { id: Number(id) },
      include: {
        lentes: true,
      },
    });
    res.json(estado);
  } catch (error) {
    console.error("Error fetching estado:", error);
    res.status(500).json({ error: error.message || "Error fetching estado" });
  }
};

export const create = async (req, res) => {
  try {
    const estado = await prisma.estado.create({
      data: req.body,
    });
    res.json(estado);
  } catch (error) {
    console.error("Error creating estado:", error);
    res.status(500).json({ error: error.message || "Error creating estado" });
  }
};

export const update = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const estado = await prisma.estado.update({
      where: { id: Number(id) },
      data,
    });
    res.json(estado);
  } catch (error) {
    console.error("Error updating estado:", error);
    res.status(500).json({ error: error.message || "Error updating estado" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.body;
    const estado = await prisma.estado.update({
      where: { id: Number(id) },
      data: { activo: false },
    });
    res.json(estado);
  } catch (error) {
    console.error("Error deleting estado:", error);
    res.status(500).json({ error: error.message || "Error deleting estado" });
  }
};

export const restore = async (req, res) => {
  try {
    const { id } = req.body;
    const estado = await prisma.estado.update({
      where: { id: Number(id) },
      data: { activo: true },
    });
    res.json(estado);
  } catch (error) {
    console.error("Error restoring estado:", error);
    res.status(500).json({ error: error.message || "Error restoring estado" });
  }
};
