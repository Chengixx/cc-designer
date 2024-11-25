import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));

//根目录
export const rootPath = resolve(dir, "..");

/****   dist   ****/
//dist出口目录
export const outputPath = resolve(rootPath, "packages/cgx-designer/dist");
//出口index文件
export const outputIndexPath = resolve(outputPath, "index.js");
//tailwindcss打包后css文件
export const tailwindModulePath = resolve(outputPath, "module.css");

/****   svg   ****/
//svg根目录
export const svgRootPath = resolve(rootPath, "packages/icons");
//svg图标目录
export const svgIconsPath = resolve(svgRootPath, "svg");
//svg组件目录
export const svgComponentsPath = resolve(svgRootPath, "src/components");
