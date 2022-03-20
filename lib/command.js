const { execSync, spawn } = require("child_process");

const { runSSH } = require("./ssh");
const { join } = require("./utilis");

function existCommand(command) {
  try {
    execSync(command + " --version");
    return true;
  } catch (err) {
    return false;
  }
}

async function runInstallCommand(sshConfig, projectConfig) {
  const localProjectName = projectConfig.name;
  const cwd = join(process.cwd(), localProjectName);
  const platform = process.platform;
  const commands =
    platform === "win32" ? ["yarn.cmd", "npm.cmd"] : ["yarn", "npm"];
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    if (existCommand(command)) {
      // run yarn install or npm install
      const ls = spawn(command, ["install"], { cwd });
      ls.stdout.on("data", (data) => {
        console.log(data.toString().blue);
      });
      ls.stderr.on("data", (data) => {
        console.log(data.toString().red);
      });
      ls.on("close", async (code) => {
        runSSH(sshConfig, projectConfig);
      });
      break;
    }
  }
}

module.exports = {
  runInstallCommand,
};
