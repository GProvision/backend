import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getAll = async (req, res) => {
  try {
    const laboratorios = await prisma.laboratorio.findMany();
    res.json(laboratorios);
  } catch (error) {
    console.error("Error fetching laboratorios:", error);
    res.status(500).json({ error: "Error fetching laboratorios" });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const laboratorio = await prisma.laboratorio.findUnique({
      where: { id: Number(id) },
      include: {
        lentes: true,
      },
    });
    res.json(laboratorio);
  } catch (error) {
    console.error("Error fetching laboratorio:", error);
    res.status(500).json({ error: "Error fetching laboratorio" });
  }
};

export const create = async (req, res) => {
  try {
    const laboratorio = await prisma.laboratorio.create({
      data: req.body,
    });
    res.json(laboratorio);
  } catch (error) {
    console.error("Error creating laboratorio:", error);
    res.status(500).json({ error: "Error creating laboratorio" });
  }
};

export const update = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const laboratorio = await prisma.laboratorio.update({
      where: { id: Number(id) },
      data,
    });
    res.json(laboratorio);
  } catch (error) {
    console.error("Error updating laboratorio:", error);
    res.status(500).json({ error: "Error updating laboratorio" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.body;
    const laboratorio = await prisma.laboratorio.update({
      where: { id: Number(id) },
      data: { activo: false },
    });
    res.json(laboratorio);
  } catch (error) {
    console.error("Error deleting laboratorio:", error);
    res.status(500).json({ error: "Error deleting laboratorio" });
  }
};

export const restore = async (req, res) => {
  try {
    const { id } = req.body;
    const laboratorio = await prisma.laboratorio.update({
      where: { id: Number(id) },
      data: { activo: true },
    });
    res.json(laboratorio);
  } catch (error) {
    console.error("Error restoring laboratorio:", error);
    res.status(500).json({ error: "Error restoring laboratorio" });
  }
};
