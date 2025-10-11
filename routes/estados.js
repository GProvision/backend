import { Router } from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
  restore,
} from "../controllers/estados.controller.js";
const EstadosRouter = Router();

EstadosRouter.get("/", getAll);
EstadosRouter.get("/:id", getOne);
EstadosRouter.post("/", create);
EstadosRouter.put("/update", update);
EstadosRouter.patch("/remove", remove);
EstadosRouter.patch("/restore", restore);

export default EstadosRouter;
