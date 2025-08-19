import { Router } from "express";
import {
  createDelegacion,
  getDelegaciones,
  getDelegacionById,
  updateDelegacion,
} from "../controllers/delegaciones.controller.js";
const DelegatesRouter = Router();

DelegatesRouter.get("/", getDelegaciones);
DelegatesRouter.get("/:id", getDelegacionById);
DelegatesRouter.post("/", createDelegacion);
DelegatesRouter.put("/update", updateDelegacion);

export default DelegatesRouter;
