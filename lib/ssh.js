const { NodeSSH } = require("node-ssh");

const { join } = require("./utilis");
const {
  START_CONNECT_HINT,
  SUCCESS_CONNECT_HINT,
  START_UPLOAD_HINT,
  COMPLETED_UPLOAD_HINT,
  START_DEPLOY_HINT,
  SUCCESS_DEPLOY_HINT,
} = require("./constant");

const ssh = new NodeSSH();

async function execCommand(...args) {
  const result = await ssh.execCommand(...args);
  if (result.stderr) {
    throw result.stderr;
  }
  return result;
}

async function connect(config) {
  console.log(START_CONNECT_HINT.yellow);

  await ssh.connect(config);

  console.log(SUCCESS_CONNECT_HINT.green);
}

async function upload(projectName, remotePath) {
  console.log(START_UPLOAD_HINT.yellow);

  const localProjectPath = join(process.cwd(), projectName);
  // delete before upload
  const removeCommand = `rm -rf ${remotePath}`;
  await execCommand(removeCommand);
  await ssh.putDirectory(localProjectPath, remotePath, {
    concurrency: 1000,
    tick(localPath, remotePath, error) {
      if (error) {
        throw error;
      }
    },
  });

  console.log(COMPLETED_UPLOAD_HINT.green);
}

async function runService(cwd, projectName) {
  console.log(START_DEPLOY_HINT.rainbow);

  const startCommand = `pm2 start index.js --name=${projectName}`;
  const restartCommand = `pm2 restart index.js --name=${projectName}`;
  try {
    // start project
    await execCommand(startCommand, {
      cwd,
    });
  } catch (err) {
    // restart project
    await execCommand(restartCommand, {
      cwd,
    });
  }

  console.log(SUCCESS_DEPLOY_HINT.rainbow);
  process.exit();
}

async function runSSH(sshConfig, projectConfig) {
  const projectName = projectConfig.name;
  let remotePath = projectConfig.path;
  // projectConfig.path: /root
  // projectName: my_project
  // remotePath: /root/my_project
  remotePath = remotePath.endsWith("/")
    ? remotePath + projectName
    : remotePath + "/" + projectName;

  await connect(sshConfig);
  await upload(projectName, remotePath);
  await runService(remotePath, projectName);
}

module.exports = {
  runSSH,
};
