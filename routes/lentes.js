import { Router } from "express";
import {
  createLente,
  updateLente,
  addLenteToFicha,
  removeLenteFromFicha,
} from "../controllers/lentes.controller.js";
const LensRouter = Router();

LensRouter.post("/", createLente);
LensRouter.put("/update", updateLente);
LensRouter.patch("/add", addLenteToFicha);
LensRouter.patch("/remove", removeLenteFromFicha);

export default LensRouter;
