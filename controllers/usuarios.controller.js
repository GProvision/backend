import { PrismaClient } from "../generated/prisma/client";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
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
    const { id, clave } = req.body;
    const hashedPassword = await hash(clave, 10);
    req.body.clave = hashedPassword;
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(usuario);
  } catch (error) {
    console.error("Error updating usuario:", error);
    res.status(500).json({ error: "Error updating usuario" });
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

export const login = async (req, res) => {
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
    const token = sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: {
        token,
      },
    });
    res.json({ token, deadTime: new Date().getTime() + 24 * 60 * 60 * 1000 });
  } catch (error) {
    console.error("Error logging in usuario:", error);
    res.status(500).json({ error: "Error logging in usuario" });
  }
};

export const logout = async (req, res) => {
  try {
    const { id } = req.body;
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
        token: null,
      },
    });
    res.json(usuario);
  } catch (error) {
    console.error("Error logging out usuario:", error);
    res.status(500).json({ error: "Error logging out usuario" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ error: "Error verifying token" });
  }
};
