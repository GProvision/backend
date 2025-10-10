import { PrismaClient } from "../generated/prisma/client.js";
import { hash, compare } from "bcryptjs";
const prisma = new PrismaClient();

export const getUsuarios = async (req, res) => {
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
    const usuarios = await prisma.usuario.findMany({
      where,
      include: {
        rol: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    res.status(500).json({ error: "Error fetching usuarios" });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        rol: true,
        acciones: true,
      },
    });
    res.json(usuario);
  } catch (error) {
    console.error("Error fetching usuario:", error);
    res.status(500).json({ error: "Error fetching usuario" });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { clave } = req.body;
    const hashedPassword = await hash(clave, 10);
    req.body.clave = hashedPassword;
    const usuario = await prisma.usuario.create({
      data: req.body,
    });
    res.json(usuario);
  } catch (error) {
    console.error("Error creating usuario:", error);
    res.status(500).json({ error: "Error creating usuario" });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    let { id, ...data } = req.body;

    if (data?.clave) {
      const hashedPassword = await hash(data.clave, 10);
      data.clave = hashedPassword;
    }

    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data,
    });
    res.json(usuario);
  } catch (error) {
    console.error("Error updating usuario:", error);
    res.status(500).json({ error: error.message || "Error updating usuario" });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: false,
      },
    });
    res.json(usuario);
  } catch (error) {
    console.error("Error deleting usuario:", error);
    res.status(500).json({ error: "Error deleting usuario" });
  }
};

export const restoreUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: true,
      },
    });
    res.json(usuario);
  } catch (error) {
    console.error("Error restoring usuario:", error);
    res.status(500).json({ error: "Error restoring usuario" });
  }
};

export const verify = async (req, res) => {
  try {
    const { user, clave } = req.body;
    const usuario = await prisma.usuario.findUnique({
      where: {
        usuario: user,
        activo: true,
      },
      include: {
        rol: true,
      },
    });
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    const isValid = await compare(clave, usuario.clave);
    if (!isValid) {
      return res.status(401).json({ error: "Clave incorrecta" });
    }

    res.json({ usuario });
  } catch (error) {
    console.error("Error logging in usuario:", error);
    res.status(500).json({ error: "Error logging in usuario" });
  }
};
