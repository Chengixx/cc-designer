import { fileURLToPath } from "url";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { emptyDir, ensureDir } from "fs-extra";
import camelcase from "camelcase";
import glob from "fast-glob";
import { format } from "prettier";
import { componentsPath } from "./paths.js";

console.log("开始转换svg->vue文件");
await ensureDir(componentsPath);
await emptyDir(componentsPath);

const files = await getAllSvg();
console.log("🆗🆗🆗已获取到svg文件列表：长度为" + files.length);

console.log("开始生成vue组件文件");
await Promise.all(files.map((file) => svg2vue(file)));
console.log("🆗🆗🆗生成vue组件文件完成!");

console.log("开始生成入口文件(index.ts)");
await createIndex(files);
console.log("🆗🆗🆗生成入口文件(index.ts)完成!");

console.log("全部生成结束!🤺🤺🤺");

async function getAllSvg() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const svgFiles = await glob("**/*.svg", {
    cwd: path.resolve(__dirname, "../svg"),
    absolute: true,
  });
  return svgFiles;
}

function getName(file) {
  const filename = path.basename(file).replace(".svg", "");
  const componentName = camelcase(filename, { pascalCase: true });
  return {
    filename,
    componentName,
  };
}

function formatCode(code, parser = "typescript") {
  return format(code, {
    parser,
    semi: false,
    singleQuote: true,
  });
}

async function svg2vue(file) {
  const content = await readFile(file, "utf-8");
  const { filename, componentName } = getName(file);
  const vue = await formatCode(
    `
<template>
${content}
</template>
<script lang="ts" setup>
defineOptions({
  name: ${JSON.stringify(componentName)}
})
</script>`,
    "vue"
  );
  writeFile(path.resolve(componentsPath, `${filename}.vue`), vue, "utf-8");
}

async function createIndex(files) {
  const code = await formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file);
        return `export { default as ${componentName}Icon } from './${filename}.vue'`;
      })
      .join("\n")
  );
  await writeFile(path.resolve(componentsPath, "index.ts"), code, "utf-8");
}
