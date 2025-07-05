import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const createLente = async (req, res) => {
  try {
    const { idTipoLente, idLaboratorio, ...data } = req.body;
    const lente = await prisma.lente.create({
      data: {
        tipoLente: {
          connect: {
            id: Number(idTipoLente),
          },
        },
        laboratorio: {
          connect: {
            id: Number(idLaboratorio),
          },
        },
        ...data,
      },
    });
    res.json({ lente });
  } catch (error) {
    console.error("Error creating lente:", error);
    res.status(500).json({ error: "Error creating lente" });
  }
};

export const addLenteToFicha = async (req, res) => {
  try {
    const { idFicha, idLente } = req.body;

    const ficha = await prisma.ficha.update({
      where: {
        id: Number(idFicha),
      },
      data: {
        lentes: {
          connect: {
            id: Number(idLente),
          },
        },
      },
    });
    res.json(ficha);
  } catch (error) {
    console.error("Error adding lente to ficha:", error);
    res.status(500).json({ error: "Error adding lente to ficha" });
  }
};

export const removeLenteFromFicha = async (req, res) => {
  try {
    const { idFicha, idLente } = req.body;
    const ficha = await prisma.ficha.update({
      where: {
        id: Number(idFicha),
      },
      data: {
        lentes: {
          disconnect: {
            id: Number(idLente),
          },
        },
      },
    });
    res.json({ ficha });
  } catch (error) {
    console.error("Error removing lente from ficha:", error);
    res.status(500).json({ error: "Error removing lente from ficha" });
  }
};

export const updateLente = async (req, res) => {
  try {
    const { idLente, ...data } = req.body;
    const lente = await prisma.lente.update({
      where: {
        id: Number(idLente),
      },
      data,
    });
    res.json({ lente });
  } catch (error) {
    console.error("Error updating lente:", error);
    res.status(500).json({ error: "Error updating lente" });
  }
};
