import fs from "fs";
import { exec } from "child_process";
import { outputIndexPath, tailwindModulePath, outputPath } from "./paths.js";
import readline from "readline";
import { promisify } from "util";

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
    // 打包完主文件后再打包CSS
    await buildCSS();
  } catch (error) {
    console.error(error.message);
  }
}

// 删除dist文件夹
function deleteDistFolder() {
  if (fs.existsSync(outputPath)) {
    console.log("删除现有的dist包...");
    fs.rmSync(outputPath, { recursive: true, force: true });
    console.log("dist包已删除");
  }
}

// 询问用户是否重新打包
async function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const questionAsync = promisify(rl.question).bind(rl);
  const answer = await questionAsync(question);
  rl.close();
  return answer;
}

async function handleRebuild() {
  const answer = await promptUser("是否重新打包 dist 文件？(y/n): ");
  if (answer.toLowerCase() === "y") {
    //同意的话直接打包main文件
    deleteDistFolder();
    await buildMain();
  } else {
    //不需要重新打包的话就检测tailwind模块
    console.log("保留现有打包文件，不进行重新打包");
    if (fs.existsSync(tailwindModulePath)) {
      console.log("已检测到有tailwindcss模块样式文件");
    } else {
      console.log("未检测到有tailwindcss模块样式文件");
      await buildCSS();
    }
  }
}

// 检查并决定是否需要打包
async function checkAndBuild() {
  if (fs.existsSync(outputIndexPath)) {
    console.log("已检测到有打包文件");
    // 提问用户是否需要重新打包dist文件
    await handleRebuild();
  } else {
    console.log("暂未检测到有打包文件，将进行自动打包");
    await buildMain();
  }
}

// 开始执行
checkAndBuild().catch((error) => {
  console.error(`总体执行错误: ${error.message}`);
});
