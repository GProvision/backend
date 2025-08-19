import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getRoles = async (req, res) => {
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
    const roles = await prisma.rol.findMany({
      where,
      include: {
        usuarios: true,
      },
    });
    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Error fetching roles" });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await prisma.rol.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        usuarios: true,
      },
    });
    res.json(role);
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ error: "Error fetching role" });
  }
};

export const createRole = async (req, res) => {
  try {
    const { nombre, activo } = req.body;
    const role = await prisma.rol.create({
      data: {
        nombre,
        activo: Boolean(activo),
      },
    });
    res.json(role);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: "Error creating role" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, activo } = req.body;
    const role = await prisma.rol.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        activo: Boolean(activo),
      },
    });
    res.json(role);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Error updating role" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await prisma.rol.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: false,
      },
    });
    res.json(role);
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ error: "Error deleting role" });
  }
};

export const restoreRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await prisma.rol.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: true,
      },
    });
    res.json(role);
  } catch (error) {
    console.error("Error restoring role:", error);
    res.status(500).json({ error: "Error restoring role" });
  }
};
