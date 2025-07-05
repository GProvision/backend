import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getClientes = async (req, res) => {
  try {
    let where = {};
    if (req.query?.activo) {
      where.activo = Boolean(req.query.activo);
    }
    if (req.query?.beneficiario) {
      where.beneficiario = {
        contains: req.query.beneficiario,
      };
    }
    if (req.query?.dni) {
      where.dni = {
        contains: req.query.dni,
      };
    }
    if (req.query?.nroAfiliado) {
      where.nroAfiliado = {
        contains: req.query.nroAfiliado,
      };
    }
    const clientes = await prisma.cliente.findMany({
      where,
    });
    res.json(clientes);
  } catch (error) {
    console.error("Error fetching clientes:", error);
    res.status(500).json({ error: "Error fetching clientes" });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        sindicato: true,
      },
    });
    res.json(cliente);
  } catch (error) {
    console.error("Error fetching cliente:", error);
    res.status(500).json({ error: "Error fetching cliente" });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { nombre, apellido, dni, nroAfiliado, idSindicato } = req.body;
    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        apellido,
        dni,
        nroAfiliado,
        idSindicato,
      },
    });
    res.json(cliente);
  } catch (error) {
    console.error("Error creating cliente:", error);
    res.status(500).json({ error: "Error creating cliente" });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const cliente = await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    });
    res.json(cliente);
  } catch (error) {
    console.error("Error updating cliente:", error);
    res.status(500).json({ error: "Error updating cliente" });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.body;
    const cliente = await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: false,
      },
    });
    res.json(cliente);
  } catch (error) {
    console.error("Error deleting cliente:", error);
    res.status(500).json({ error: "Error deleting cliente" });
  }
};

export const restoreCliente = async (req, res) => {
  try {
    const { id } = req.body;
    const cliente = await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: true,
      },
    });
    res.json(cliente);
  } catch (error) {
    console.error("Error restoring cliente:", error);
    res.status(500).json({ error: "Error restoring cliente" });
  }
};
