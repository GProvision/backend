import multer from "multer";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync, existsSync } from "node:fs";

const file = fileURLToPath(import.meta.url);
const dir = join(dirname(file), "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = join(dir, req.query.folder || "");
    if (!existsSync(folder)) {
      mkdirSync(folder);
    }
    return cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname));
  },
});

export default multer({ storage });
