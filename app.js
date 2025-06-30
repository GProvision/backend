import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const file = fileURLToPath(import.meta.url);
const dir = join(dirname(file), "uploads");

const app = express();

// Configuración básica de rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por ventana por IP
  standardHeaders: true, // Devuelve información del rate limit en los headers
  legacyHeaders: false, // Desactiva los headers legacy
  message: {
    success: false,
    message:
      "Demasiadas peticiones desde esta IP, por favor intente de nuevo en 15 minutos.",
  },
});

// Middlewares
app.use(cors());
app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dir));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
  console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
});
