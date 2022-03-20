const { join, readFileSync, writeFileSync, cpSync } = require("./utilis");

function initialLocalProject(webpackBuildPath, localProjectPath, port) {
  // copy webpack build to localProject
  cpSync(webpackBuildPath, join(localProjectPath, "dist"), {
    recursive: true,
  });
  // cp server template to localProject
  const serverPackageJsonPath = join(__dirname, "../server");
  cpSync(serverPackageJsonPath, localProjectPath, {
    recursive: true,
  });
  const projectPort = port;
  const projectScriptPath = join(localProjectPath, "./index.js");
  // replace the project port
  const projectScriptContent = readFileSync(projectScriptPath, "utf-8").replace(
    "port",
    projectPort
  );
  writeFileSync(projectScriptPath, projectScriptContent);
}

module.exports = initialLocalProject;
