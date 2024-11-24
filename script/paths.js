import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));

//根目录
export const rootPath = resolve(dir, "..");

//svg根目录
export const svgRootPath = resolve(rootPath, "packages/icons");
//svg图标目录
export const svgIconsPath = resolve(svgRootPath, "svg");
//svg组件目录
export const svgComponentsPath = resolve(svgRootPath, "src/components");
