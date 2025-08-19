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
} from "../controllers/opticas.controller.js";
const OpticsRouter = Router();

OpticsRouter.get("/", getOpticas);
OpticsRouter.get("/:id", getOpticaById);
OpticsRouter.post("/", createOptica);
OpticsRouter.put("/update", updateOptica);
OpticsRouter.patch("/delete", deleteOptica);
OpticsRouter.patch("/restore", restoreOptica);
OpticsRouter.patch("/add", addSindicatoToOptica);
OpticsRouter.patch("/remove", removeSindicatoFromOptica);

export default OpticsRouter;
