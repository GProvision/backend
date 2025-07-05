import { Router } from "express";
import {
  createFicha,
  getFichaById,
  getFichas,
  updateFicha,
  deleteFicha,
  restoreFicha,
} from "../controllers/fichas.controller.js";
const router = Router();

router.get("/", getFichas);
router.get("/:id", getFichaById);
router.post("/", createFicha);
router.put("/update", updateFicha);
router.patch("/delete", deleteFicha);
router.patch("/restore", restoreFicha);

export default router;
