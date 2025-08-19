import { Router } from "express";
import {
  createUsuario,
  getUsuarioById,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  restoreUsuario,
  login,
} from "../controllers/usuarios.controller.js";

const UserRouter = Router();

UserRouter.get("/", getUsuarios);
UserRouter.get("/:id", getUsuarioById);
UserRouter.put("/update", updateUsuario);
UserRouter.patch("/delete", deleteUsuario);
UserRouter.patch("/restore", restoreUsuario);
UserRouter.post("/", createUsuario);
UserRouter.post("/login", login);

export default UserRouter;
