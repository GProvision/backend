import { rateLimit } from "express-rate-limit";
const config = {};

config.windowMs = 15 * 60 * 1000; // 15 minutos
config.max = 1000; // Límite de 100 peticiones por ventana por IP
config.standardHeaders = true; // Devuelve información del rate limit en los headers
config.legacyHeaders = false; // Desactiva los headers legacy
config.message = {};
config.message.success = false;
config.message.message = "Demasiadas peticiones desde esta IP";

export default rateLimit(config);
