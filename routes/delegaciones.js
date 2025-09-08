import { Router } from "express";
import {
  createDelegacion,
  getDelegaciones,
  getDelegacionById,
  updateDelegacion,
  deleteDelegacion,
  restoreDelegacion,
} from "../controllers/delegaciones.controller.js";
const DelegatesRouter = Router();

DelegatesRouter.get("/", getDelegaciones);
DelegatesRouter.get("/:id", getDelegacionById);
DelegatesRouter.post("/", createDelegacion);
DelegatesRouter.put("/update", updateDelegacion);
DelegatesRouter.patch("/restore", restoreDelegacion);
DelegatesRouter.delete("/delete", deleteDelegacion);

export default DelegatesRouter;
