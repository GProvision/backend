import { Router } from "express";
import {
  createDelegacion,
  getDelegaciones,
  getDelegacionById,
  updateDelegacion,
} from "../controllers/delegaciones.controller.js";
const router = Router();

router.get("/", getDelegaciones);
router.get("/:id", getDelegacionById);
router.post("/", createDelegacion);
router.put("/update", updateDelegacion);

export default router;
