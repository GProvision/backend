import { Router } from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
  restore,
} from "../controllers/laboratorios.controller.js";
const LaboratoriosRouter = Router();

LaboratoriosRouter.get("/", getAll);
LaboratoriosRouter.get("/:id", getOne);
LaboratoriosRouter.post("/", create);
LaboratoriosRouter.put("/update", update);
LaboratoriosRouter.patch("/remove", remove);
LaboratoriosRouter.patch("/restore", restore);

export default LaboratoriosRouter;
