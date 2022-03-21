<div align='center'>

# koa-deploy-webpack-plugin
<div align=center>
 <img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" alt="webpack-logo" style="width: 400px;height: 400px;"/>
<div align=center>
<img src="https://seeklogo.com/images/K/koa-logo-D494764315-seeklogo.com.png" alt="koa-logo" style="" />
<div align=center>
<img src="https://raw.githubusercontent.com/unitech/pm2/master/pres/pm2.20d3ef.png" alt="pm2-logo" style="" />

<div align='left'>

# 前提
  该插件最终会在服务器上执行pm2命令。所以**你的服务器必须要有pm2**。
# 安装
  ```shell
  npm i koa-deploy-webpack-plugin -D
  ```
   ```shell
  yarn add koa-deploy-webpack-plugin -D
  ```
# 使用
  ```js
// webpack.config.js
const KoaDeployWebpackPlugin = require("koa-deploy-webpack-plugin");
module.exports = {
  plugins: [
    new KoaDeployWebpackPlugin({
      ssh: {
        host: "", // 你的服务器地址，例如 111.111.111.111
        port: 22, // ssh连接的端口号，默认为22
        username: "root", // 连接服务器的用户名，默认为root
        password: "", // 连接服务器的密码
      },
      project: {
        name: "cf_deploy_project", // 你的项目目录名, 默认为cf_deploy_project
        path: "/", // 项目存放于服务器的位置，默认为/
        port: 8080, // 项目运行的端口号，默认为8080
      },
    }),
  ],
};
```
