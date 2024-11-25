import fs from "fs";
import { exec } from "child_process";
import { outputIndexPath, tailwindModulePath } from "./paths.js";

// 检查是否已经打包，打包路径是dist里的index.js
if (fs.existsSync(outputIndexPath)) {
  console.log("已检测到有打包文件,检测是否已经打包了css文件");
  if (fs.existsSync(tailwindModulePath)) {
    console.log("已检测到有tailwindcss模块样式文件");
  } else {
    console.log("tailwindcss模块样式文件未打包，将进行打包");
    exec(
      "pnpm build:css",
      { maxBuffer: 1024 * 1024 * 1024 },
      (error, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        if (error) {
          console.error(`执行错误: ${error}`);
          return;
        } else {
          console.log("打包css完成,将自动启动example");
        }
      }
    );
  }
} else {
  console.log("暂未检测到有打包文件，将进行自动打包");
  exec(
    "pnpm build",
    { maxBuffer: 1024 * 1024 * 1024 },
    (error, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      if (error) {
        console.error(`执行错误: ${error}`);
        return;
      } else {
        console.log("dist打包完成,将打包tailwindcss样式文件");
        exec(
          "pnpm build:css",
          { maxBuffer: 1024 * 1024 * 1024 },
          (error, stdout, stderr) => {
            // console.log(stdout);
            // console.error(stderr);
            if (error) {
              console.error(`执行错误: ${error}`);
              return;
            } else {
              console.log("打包css完成,将自动启动example");
            }
          }
        );
      }
    }
  );
}
