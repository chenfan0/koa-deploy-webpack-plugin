const Koa = require("koa");
const static = require("koa-static-history");

const app = new Koa();

app.use(static("./dist"));

app.listen("port", () => {
  console.log("server run!!!");
});
