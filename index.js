const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("child_process");

const { NodeSSH } = require("node-ssh");
const colors = require("colors");

const ssh = new NodeSSH();

function existCommand(command) {
  try {
    execSync(command + " --version");
    return true;
  } catch (err) {
    return false;
  }
}

async function installCommand() {
  const cwd = join(process.cwd(), "server");
  const platform = process.platform;
  const commands =
    platform === "win32" ? ["yarn.cmd", "npm.cmd"] : ["yarn", "npm"];
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    if (existCommand(command)) {
      const ls = spawn(command, ["install"], { cwd });
      ls.stdout.on("data", (data) => {
        console.log(colors.blue(data.toString()));
      });
      ls.stderr.on("data", (data) => {
        console.error(data.toString());
      });
      ls.on("close", async (code) => {
        const serverDir = join(process.cwd(), "server");
        console.log(colors.rainbow("Start Connecting to the server..."));
        await ssh.connect({
          host: "81.71.36.158",
          username: "root",
          password: "c13005261761F",
        });
        console.log(colors.rainbow("Connecting to the server successfully!!!"));
        console.log(colors.rainbow("Start uploading files..."));
        await ssh.putDirectory(serverDir, "/root/dist", {
          concurrency: 1000,
          tick(localPath, remotePath, error) {
            if (error) {
              console.error(error);
            } else {
              // console.log(colors.green(localPath));
            }
          },
        });
        console.log(colors.rainbow("File uploaded successfully!!!"));
        // await ssh.execCommand("node index.js", {
        //   cwd: "/root/dist",
        // });
      });
      break;
    }
  }
}

const pluginName = "PublishPlugin";

function join(...args) {
  return path.join(...args);
}

class PublishPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, async ({ compilation }) => {
      // 生成一个js脚本可以创建一个静态服务器
      const { outputOptions } = compilation;
      const webpackBuildPath = outputOptions.path;

      // 生成一个新的目录，打包的文件存放在该目录中
      const serverDir = join(process.cwd(), "server");
      // 将打包后的文件复制到新创建的目录下
      fs.cpSync(webpackBuildPath, join(serverDir, "dist"), { recursive: true });
      // 生成创建服务器所需要的的package.json
      const serverPackageJsonPath = join(__dirname, "./server");
      fs.cpSync(serverPackageJsonPath, serverDir, {
        recursive: true,
      });
      const serverPort = 8080;
      const serverScriptPath = join(serverDir, "./index.js");
      const serverContent = fs
        .readFileSync(serverScriptPath, "utf-8")
        .replace("port", serverPort);
      fs.writeFileSync(serverScriptPath, serverContent);
      // 安装服务器脚本依赖
      installCommand();
    });
  }
}

module.exports = PublishPlugin;
