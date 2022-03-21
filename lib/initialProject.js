const { join, readFileSync, writeFileSync, cpSync } = require("./utilis");

function initialLocalProject(
  webpackBuildPath,
  localProjectPath,
  port,
  staticConifg
) {
  const staticConfigStr = JSON.stringify(staticConifg);
  const staticPlaceHolder = '"staticConfig"';
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
  // replace the project port and the static project
  let projectScriptContent = readFileSync(projectScriptPath, "utf-8")
    .replace("port", projectPort)
    .replace(staticPlaceHolder, staticConfigStr);
  writeFileSync(projectScriptPath, projectScriptContent);
}

module.exports = initialLocalProject;
