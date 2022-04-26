const Koa = require("koa");
const static = require("koa-static-history");
const history = require('koa-history-api-fallback')

const app = new Koa();
app.use(history())
app.use(static("./dist", "staticConfig"));

app.listen("port", () => {
  console.log("server run!!!");
});
