import fs from "fs";
import { exec } from "child_process";
import { outputIndexPath, tailwindModulePath } from "./paths.js";

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(
      command,
      { maxBuffer: 1024 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`执行错误: ${error}\n${stderr}`));
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

// 打包css文件的逻辑
async function buildCSS() {
  try {
    console.log("进行打包tailwindcss样式文件...");
    const output = await execPromise("pnpm build:css");
    console.log(output);
    console.log("打包css完成");
  } catch (error) {
    console.error(error.message);
  }
}

// 打包main文件的逻辑
async function buildMain() {
  try {
    console.log("正在打包dist文件...");
    const output = await execPromise("pnpm build");
    console.log(output);
    console.log("dist打包完成,将打包tailwindcss样式文件");
    await buildCSS(); // 打包完主文件后再打包CSS
  } catch (error) {
    console.error(error.message);
  }
}

// 检查并决定是否需要打包
async function checkAndBuild() {
  if (fs.existsSync(outputIndexPath)) {
    console.log("已检测到有打包文件, 检测是否已经打包了css文件");
    if (fs.existsSync(tailwindModulePath)) {
      console.log("已检测到有tailwindcss模块样式文件");
    } else {
      console.log("未检测到有tailwindcss模块样式文件");
      await buildCSS();
    }
  } else {
    console.log("暂未检测到有打包文件，将进行自动打包");
    await buildMain();
  }
}

// 开始执行
checkAndBuild().catch((error) => {
  console.error(`总体执行错误: ${error.message}`);
});
