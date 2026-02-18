import fs from "fs";
import fsp from "fs/promises";
import { PATHS, STORAGE_MODE } from "../config.js";


export async function readIndex() {
  if (STORAGE_MODE === "sync") {
    const txt = fs.readFileSync(PATHS.DATA_PATH, "utf8");
    return JSON.parse(txt || "[]");
  }
  const txt = await fsp.readFile(PATHS.DATA_PATH, "utf8");
  return JSON.parse(txt || "[]");
}

export async function writeIndex(docs) {
  const json = JSON.stringify(docs, null, 2);
  if (STORAGE_MODE === "sync") {
    const tmp = `${PATHS.DATA_PATH}.tmp`;
    fs.writeFileSync(tmp, json, "utf8");
    fs.renameSync(tmp, PATHS.DATA_PATH);
    return;
  }
  const tmp = `${PATHS.INCIDENTS_INDEX}.tmp`;
  await fsp.writeFile(tmp, json, "utf8");
  await fsp.rename(tmp, PATHS.DATA_PATH);
}

export async function deleteIndex(docs) {
  const json = JSON.stringify(docs, null, 2);
  if (STORAGE_MODE === "sync") {
    const tmp = `${PATHS.DATA_PATH}.tmp`;
    fs.writeFileSync(tmp, json, "utf8");
    fs.renameSync(tmp, PATHS.DATA_PATH);
    return;
  }
  const tmp = `${PATHS.INCIDENTS_INDEX}.tmp`;
  await fsp.writeFile(tmp, json, "utf8");
  await fsp.rename(tmp, PATHS.DATA_PATH);
}