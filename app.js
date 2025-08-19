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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
  console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
});
