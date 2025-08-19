import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

// Routes
import UserRouter from "./routes/usuarios";
import RolRouter from "./routes/roles";
import SyndicatesRouter from "./routes/sindicatos";
import DelegatesRouter from "./routes/delegaciones";
import OpticsRouter from "./routes/opticas";
import ArmsRouter from "./routes/armazones";
import LensTypeRouter from "./routes/tiposLentes";
import LensRouter from "./routes/lentes";
import ClientsRouter from "./routes/clientes";
import NotesRouter from "./routes/fichas";
app.use("/usuarios", UserRouter);
app.use("/roles", RolRouter);
app.use("/sindicatos", SyndicatesRouter);
app.use("/delegaciones", DelegatesRouter);
app.use("/opticas", OpticsRouter);
app.use("/armazones", ArmsRouter);
app.use("/tipos", LensTypeRouter);
app.use("/lentes", LensRouter);
app.use("/clientes", ClientsRouter);
app.use("/fichas", NotesRouter);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
  console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
});
