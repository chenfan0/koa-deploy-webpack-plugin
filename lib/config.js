const defaultSshConfig = {
  port: 22,
  username: "root",
};

const defaultProjectConfig = {
  name: "cf_deploy_project",
  path: "/",
  port: 8080,
};

module.exports = {
  defaultSshConfig,
  defaultProjectConfig
}
