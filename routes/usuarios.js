import { Router } from "express";
import {
  createUsuario,
  getUsuarioById,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  restoreUsuario,
  login,
  logout,
  verifyToken,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.put("/update", updateUsuario);
router.patch("/delete", deleteUsuario);
router.patch("/restore", restoreUsuario);
router.post("/", createUsuario);
router.post("/login", login);
router.post("/logout", logout);
router.post("/token", verifyToken);

export default router;
