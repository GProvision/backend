import { Router } from "express";
import {
  createAccion,
  getAcciones,
  getAccionesByUserId,
} from "../controllers/acciones.controller.js";

const ActionsRouter = Router();

ActionsRouter.get("/", getAcciones);
ActionsRouter.get("/:userId", getAccionesByUserId);
ActionsRouter.post("/", createAccion);

export default ActionsRouter;
