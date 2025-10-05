import { Router } from "express";
import {
  getSindicatos,
  getSindicatoById,
  createSindicato,
  updateSindicato,
  deleteSindicato,
  restoreSindicato,
  removeSindicato,
} from "../controllers/sindicatos.controller.js";
const SyndicatesRouter = Router();

SyndicatesRouter.get("/", getSindicatos);
SyndicatesRouter.get("/:id", getSindicatoById);
SyndicatesRouter.post("/", createSindicato);
SyndicatesRouter.put("/update", updateSindicato);
SyndicatesRouter.patch("/delete", deleteSindicato);
SyndicatesRouter.patch("/restore", restoreSindicato);
SyndicatesRouter.delete("/remove", removeSindicato);

export default SyndicatesRouter;
