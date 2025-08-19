import { Router } from "express";
import {
  createFicha,
  getFichaById,
  getFichas,
  updateFicha,
  deleteFicha,
  restoreFicha,
} from "../controllers/fichas.controller.js";
const NotesRouter = Router();

NotesRouter.get("/", getFichas);
NotesRouter.get("/:id", getFichaById);
NotesRouter.post("/", createFicha);
NotesRouter.put("/update", updateFicha);
NotesRouter.patch("/delete", deleteFicha);
NotesRouter.patch("/restore", restoreFicha);

export default NotesRouter;
