const { join, extend } = require("./lib/utilis");
const { runInstallCommand } = require("./lib/command");
const { PLUGIN_NAME } = require("./lib/constant");
const initialLocalProject = require("./lib/initialProject");

class KoaDeployWebpackPlugin {
  constructor(config = {}) {
    const defaultSshConfig = {
      port: 22,
      username: "root",
    };
    const defaultProjectConfig = {
      name: "cf_deploy_project",
      path: "/",
      port: 8080,
    };
    this.sshConfig = extend(defaultSshConfig, config.ssh);
    this.projectConfig = extend(defaultProjectConfig, config.project);
  }
  apply(compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, async ({ compilation }) => {
      const { outputOptions } = compilation;
      const webpackBuildPath = outputOptions.path;

      const projectName = this.projectConfig.name;
      const projectPort = this.projectConfig.port;
      const localProjectPath = join(process.cwd(), projectName);
      initialLocalProject(webpackBuildPath, localProjectPath, projectPort);
      // 安装服务器脚本依赖
      runInstallCommand(this.sshConfig, this.projectConfig);
    });
  }
}

module.exports = KoaDeployWebpackPlugin;
