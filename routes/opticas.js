import { Router } from "express";
import {
  createOptica,
  getOpticaById,
  getOpticas,
  updateOptica,
  deleteOptica,
  restoreOptica,
  addSindicatoToOptica,
  removeSindicatoFromOptica,
  addDelegacionToOptica,
  removeDelegacionFromOptica,
} from "../controllers/opticas.controller.js";
const OpticsRouter = Router();

OpticsRouter.get("/", getOpticas);
OpticsRouter.get("/:id", getOpticaById);
OpticsRouter.post("/", createOptica);
OpticsRouter.put("/update", updateOptica);
OpticsRouter.patch("/delete", deleteOptica);
OpticsRouter.patch("/restore", restoreOptica);
OpticsRouter.patch("/addSindicato", addSindicatoToOptica);
OpticsRouter.patch("/removeSindicato", removeSindicatoFromOptica);
OpticsRouter.patch("/addDelegacion", addDelegacionToOptica);
OpticsRouter.patch("/removeDelegacion", removeDelegacionFromOptica);

export default OpticsRouter;
