import { Router } from "express";
import {
  getSindicatos,
  getSindicatoById,
  createSindicato,
  updateSindicato,
} from "../controllers/sindicatos.controller.js";
const SyndicatesRouter = Router();

SyndicatesRouter.get("/", getSindicatos);
SyndicatesRouter.get("/:id", getSindicatoById);
SyndicatesRouter.post("/", createSindicato);
SyndicatesRouter.put("/update", updateSindicato);

export default SyndicatesRouter;
