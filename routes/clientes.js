import { Router } from "express";
import {
  createCliente,
  getClienteById,
  getClientes,
  updateCliente,
  deleteCliente,
  restoreCliente,
} from "../controllers/clientes.controller.js";
const ClientsRouter = Router();

ClientsRouter.get("/", getClientes);
ClientsRouter.get("/:id", getClienteById);
ClientsRouter.post("/", createCliente);
ClientsRouter.put("/update", updateCliente);
ClientsRouter.patch("/delete", deleteCliente);
ClientsRouter.patch("/restore", restoreCliente);

export default ClientsRouter;
