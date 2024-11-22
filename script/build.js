const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

// 检查是否已经打包，打包路径是dist里的index.js
const filePath = path.join(__dirname, "../packages/cgx-designer/dist/index.js");

if (fs.existsSync(filePath)) {
  console.log("已检测到有打包文件,将自动启动example");
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
        return
      } else {
        console.log("打包完成,将自动启动example");
      }
    }
  );
}
