import { Router } from "express";
import {
  createUsuario,
  getUsuarioById,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  restoreUsuario,
  verify,
} from "../controllers/usuarios.controller.js";

const UserRouter = Router();

UserRouter.get("/", getUsuarios);
UserRouter.get("/:id", getUsuarioById);
UserRouter.put("/update", updateUsuario);
UserRouter.patch("/delete", deleteUsuario);
UserRouter.patch("/restore", restoreUsuario);
UserRouter.post("/", createUsuario);
UserRouter.post("/verify", verify);

export default UserRouter;
