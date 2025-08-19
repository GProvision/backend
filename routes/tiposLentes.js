import { Router } from "express";
import {
  createTipoLente,
  getTipoLentes,
  updateTipoLente,
  deleteTipoLente,
  restoreTipoLente,
} from "../controllers/tiposlentes.controller.js";
const LensTypeRouter = Router();

LensTypeRouter.get("/", getTipoLentes);
LensTypeRouter.post("/", createTipoLente);
LensTypeRouter.put("/update", updateTipoLente);
LensTypeRouter.patch("/delete", deleteTipoLente);
LensTypeRouter.patch("/restore", restoreTipoLente);

export default LensTypeRouter;
