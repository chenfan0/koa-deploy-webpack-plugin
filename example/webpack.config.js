const HtmlWebpackPlugin = require("html-webpack-plugin");
const KoaDeployWebpackPlugin = require("../index");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new KoaDeployWebpackPlugin({
      ssh: {
        host: "81.71.36.158", // 你的服务器地址，例如 111.111.111.111
        port: 22, // ssh连接的端口号，默认为22
        username: "root", // 连接服务器的用户名，默认为root
        password: "c13005261761F", // 连接服务器的密码
      },
      project: {
        name: "cf_deploy_project", // 你的项目目录名, 默认为cf_deploy_project
        path: "/root", // 项目存放于服务器的位置，默认为/
        port: 8080, // 项目运行的端口号，默认为8080
      },
    }),
  ],
};
