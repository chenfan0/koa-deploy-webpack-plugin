<div align='center'>

# koa-deploy-webpack-plugin
<div align=center>
 <img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" alt="webpack-logo" style="width: 400px;height: 400px;"/>
<div align=center>
<img src="https://seeklogo.com/images/K/koa-logo-D494764315-seeklogo.com.png" alt="koa-logo" style="" />
<div align=center>
<img src="https://raw.githubusercontent.com/unitech/pm2/master/pres/pm2.20d3ef.png" alt="pm2-logo" style="" />

<div align='left'>
 
# 介绍
 **该插件可以帮助你将打包后的文件自动上传到服务器并进行部署。**
# 前提
  该插件本质上是通过`koa-static-history`创建一个静态服务脚本，并通过`pm2`命令执行该脚本。也就是说**你的服务器必须有安装有`pm2`**。
# 安装
  ```shell
  npm i koa-deploy-webpack-plugin -D
  ```
   ```shell
  yarn add koa-deploy-webpack-plugin -D
  ```
# 配置选项
 - `ssh`：通过该选项进行ssh连接的配置。该插件中ssh的连接使用的是`node-ssh`中的`ssh.connect`进行连接。可以通过[node-ssh](https://github.com/steelbrain/node-ssh#readme)
 查看该选项的其他配置。
 - `project`：配置项目名称，项目存储路径，项目运行端口号。
 - `compress`：对文件进行压缩。内部使用的是`compress-webpack-plugin`进行文件压缩，默认会开启gizp压缩。如果想要进行更加详细的配置，可以查看[compress-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin#options)。
 - `staticConfig`：对静态服务进行配置。例如配置开启history模式，配置文件的缓存时间等等。可以如果想要进行更加详细的配置，可以查看[koa-sents](https://github.com/chenfan0/send#options)。
  ```js
const KoaDeployWebpackPlugin = require("koa-deploy-webpack-plugin");

module.exports = {
   output: {
     clean: true,
   },
   plugins: [
     new HtmlWebpackPlugin(),
     new KoaDeployWebpackPlugin({
       ssh: {
         host: "", // 你的服务器地址，例如 111.111.111.111
         port: 22, // ssh连接的端口号，默认为22
         username: "root", // 连接服务器的用户名，默认为root
         password: "", 
       },
       project: {
         name: "cf_deploy_project", // 你的项目目录名, 默认为cf_deploy_project
         path: "/", // 项目存放于服务器的位置，默认为/
         port: 8080, // 项目运行的端口号，默认为8080
       },
       compress: {
         test: /\.(css|js)$/i,
       },
       staticConfig: {
         history: true,  // 启动history模式
         maxage: {   // 设置缓存时间
           html: 0,
           js: 100000,
         },
       },
     }),
   ],
};

```
