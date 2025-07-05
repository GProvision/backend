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
const router = Router();

router.get("/", getOpticas);
router.get("/:id", getOpticaById);
router.post("/", createOptica);
router.put("/update", updateOptica);
router.patch("/delete", deleteOptica);
router.patch("/restore", restoreOptica);
router.patch("/add", addSindicatoToOptica);
router.patch("/remove", removeSindicatoFromOptica);

export default router;
