import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));

export const rootPath = resolve(dir, "..");
export const srcPath = resolve(rootPath, "src");
export const componentsPath = resolve(srcPath, "components");
