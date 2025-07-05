import { Router } from "express";
import {
  createAccion,
  getAcciones,
  getAccionesByUserId,
} from "../controllers/acciones.controller.js";

const router = Router();

router.get("/", getAcciones);
router.get("/:userId", getAccionesByUserId);
router.post("/", createAccion);

export default router;
