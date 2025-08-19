import { Router } from "express";
import {
  createRole,
  getRoleById,
  getRoles,
  updateRole,
  deleteRole,
  restoreRole,
} from "../controllers/roles.controller.js";
const RolRouter = Router();

RolRouter.get("/", getRoles);
RolRouter.get("/:id", getRoleById);
RolRouter.post("/", createRole);
RolRouter.put("/update", updateRole);
RolRouter.patch("/delete", deleteRole);
RolRouter.patch("/restore", restoreRole);

export default RolRouter;
