import { Router } from "express";
import {
  createArmazon,
  getArmazones,
  getArmazonById,
  reduceArmazon,
  updateArmazon,
  deleteArmazon,
  restoreArmazon,
} from "../controllers/armazones.controller.js";

const router = Router();

router.get("/", getArmazones);
router.get("/:id", getArmazonById);
router.post("/", createArmazon);
router.put("/update", updateArmazon);
router.patch("/reduce", reduceArmazon);
router.patch("/delete", deleteArmazon);
router.patch("/restore", restoreArmazon);

export default router;
