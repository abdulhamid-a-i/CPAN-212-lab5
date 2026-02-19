import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const STORAGE_MODE = "async";


export const PATHS = {
    DATA_DIR:  path.join(__dirname, "data"),
    DATA_PATH: path.join(__dirname, "data", "clients.json")
}

console.log(PATHS.DATA_DIR)

export const RISKCATEGORIES = ["High", "Medium", "Low"];