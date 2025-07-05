import { Router } from "express";
import {
  createRole,
  getRoleById,
  getRoles,
  updateRole,
  deleteRole,
  restoreRole,
} from "../controllers/roles.controller.js";
const router = Router();

router.get("/", getRoles);
router.get("/:id", getRoleById);
router.post("/", createRole);
router.put("/update", updateRole);
router.patch("/delete", deleteRole);
router.patch("/restore", restoreRole);

export default router;
