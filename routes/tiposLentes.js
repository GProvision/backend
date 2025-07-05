import { Router } from "express";
import {
  createTipoLente,
  getTipoLentes,
  updateTipoLente,
  deleteTipoLente,
  restoreTipoLente,
} from "../controllers/tiposlentes.controller.js";
const router = Router();

router.get("/", getTipoLentes);
router.post("/", createTipoLente);
router.put("/update", updateTipoLente);
router.patch("/delete", deleteTipoLente);
router.patch("/restore", restoreTipoLente);

export default router;
