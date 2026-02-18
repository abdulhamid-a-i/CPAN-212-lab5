import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const STORAGE_MODE = "async";


export const PATHS = {
    DATA_PATH: path.join(__dirname, "data", "clients.json")
}

export const SEVERITIES = ["High", "Medium", "Low"];