import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const createAccion = async (req, res) => {
  try {
    const { usuarioId, accion, recurso, recursoId } = req.body;
    const accionCreated = await prisma.accion.create({
      data: {
        usuarioId,
        accion,
        recurso,
        recursoId,
      },
    });
    res.json(accionCreated);
  } catch (error) {
    console.error("Error creating accion:", error);
    res.status(500).json({ error: "Error creating accion" });
  }
};

export const getAcciones = async (req, res) => {
  try {
    const acciones = await prisma.accion.findMany();
    res.json(acciones);
  } catch (error) {
    console.error("Error fetching acciones:", error);
    res.status(500).json({ error: "Error fetching acciones" });
  }
};

export const getAccionesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const acciones = await prisma.accion.findMany({
      where: {
        usuarioId: Number(userId),
      },
    });
    res.json(acciones);
  } catch (error) {
    console.error("Error fetching acciones:", error);
    res.status(500).json({ error: "Error fetching accion" });
  }
};
