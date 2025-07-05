import { Router } from "express";
import {
  createCliente,
  getClienteById,
  getClientes,
  updateCliente,
  deleteCliente,
  restoreCliente,
} from "../controllers/clientes.controller.js";
const router = Router();

router.get("/", getClientes);
router.get("/:id", getClienteById);
router.post("/", createCliente);
router.put("/update", updateCliente);
router.patch("/delete", deleteCliente);
router.patch("/restore", restoreCliente);

export default router;
