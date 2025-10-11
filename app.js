import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import detectPort from "detect-port";
// import rateLimit from "./middlewares/rateLimit";
dotenv.config();

const file = fileURLToPath(import.meta.url);
const dir = join(dirname(file), "uploads");

const app = express();

// Middlewares
app.use(cors());
// app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dir));
app.use(morgan("combined"));
// Routes
import UserRouter from "./routes/usuarios.js";
import RolRouter from "./routes/roles.js";
import SyndicatesRouter from "./routes/sindicatos.js";
import DelegatesRouter from "./routes/delegaciones.js";
import OpticsRouter from "./routes/opticas.js";
import ArmsRouter from "./routes/armazones.js";
import LensTypeRouter from "./routes/tiposLentes.js";
import LensRouter from "./routes/lentes.js";
import ClientsRouter from "./routes/clientes.js";
import NotesRouter from "./routes/fichas.js";
app.use("/usuarios", UserRouter);
app.use("/roles", RolRouter);
app.use("/sindicatos", SyndicatesRouter);
app.use("/delegaciones", DelegatesRouter);
app.use("/opticas", OpticsRouter);
app.use("/armazones", ArmsRouter);
app.use("/tipos/lentes", LensTypeRouter);
app.use("/lentes", LensRouter);
app.use("/clientes", ClientsRouter);
app.use("/fichas", NotesRouter);

// Start Server
const port = await detectPort(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto http://localhost:${port}`);
  console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
});
