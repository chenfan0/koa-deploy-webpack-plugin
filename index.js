const compressionPlugin = require("compression-webpack-plugin");

const { join, extend } = require("./lib/utilis");
const { runCommand } = require("./lib/command");
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
    this.compressConfig = config.compress || {};
  }
  apply(compiler) {
    // use compression-webpack-plugin
    const compress = new compressionPlugin(this.compressConfig);
    compress.apply(compiler);

    compiler.hooks.done.tap(PLUGIN_NAME, async ({ compilation }) => {
      const { outputOptions } = compilation;
      const webpackBuildPath = outputOptions.path;

      const projectName = this.projectConfig.name;
      const projectPort = this.projectConfig.port;
      const localProjectPath = join(process.cwd(), projectName);
      initialLocalProject(webpackBuildPath, localProjectPath, projectPort);
      runCommand(this.sshConfig, this.projectConfig);
    });
  }
}

module.exports = KoaDeployWebpackPlugin;
