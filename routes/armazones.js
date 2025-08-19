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

const ArmsRouter = Router();

ArmsRouter.get("/", getArmazones);
ArmsRouter.get("/:id", getArmazonById);
ArmsRouter.post("/", createArmazon);
ArmsRouter.put("/update", updateArmazon);
ArmsRouter.patch("/reduce", reduceArmazon);
ArmsRouter.patch("/delete", deleteArmazon);
ArmsRouter.patch("/restore", restoreArmazon);

export default ArmsRouter;
