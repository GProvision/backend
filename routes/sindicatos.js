import { Router } from "express";
import {
  getSindicatos,
  getSindicatoById,
  createSindicato,
  updateSindicato,
} from "../controllers/sindicatos.controller.js";
const router = Router();

router.get("/", getSindicatos);
router.get("/:id", getSindicatoById);
router.post("/", createSindicato);
router.put("/update", updateSindicato);

export default router;
