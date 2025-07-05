import { Router } from "express";
import {
  createLente,
  updateLente,
  addLenteToFicha,
  removeLenteFromFicha,
} from "../controllers/lentes.controller.js";
const router = Router();

router.post("/", createLente);
router.put("/update", updateLente);
router.patch("/add", addLenteToFicha);
router.patch("/remove", removeLenteFromFicha);

export default router;
