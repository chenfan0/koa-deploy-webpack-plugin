const PLUGIN_NAME = "koa-deploy-webpack-plugin";

const START_CONNECT_HINT = "Start Connecting to the server...".yellow;
const SUCCESS_CONNECT_HINT = "Connecting to the server successfully!!!".green;
const START_UPLOAD_HINT = "Start uploading files...".yellow;
const COMPLETED_UPLOAD_HINT = "File upload completed!!!".green;
const START_DEPLOY_HINT = "Start deploying the project...".rainbow;
const SUCCESS_DEPLOY_HINT = "Deployed the project succed!!!".rainbow;

const CONNECT_ERROR_HINT =
  "The connection failed. Please check whether the parameter or network is incorrect!"
    .red;
const PM2_NOT_FOUND_HINT = "bash: pm2: command not found!".red;

module.exports = {
  PLUGIN_NAME,
  START_CONNECT_HINT,
  SUCCESS_CONNECT_HINT,
  START_UPLOAD_HINT,
  COMPLETED_UPLOAD_HINT,
  START_DEPLOY_HINT,
  SUCCESS_DEPLOY_HINT,
  CONNECT_ERROR_HINT,
  PM2_NOT_FOUND_HINT,
};
