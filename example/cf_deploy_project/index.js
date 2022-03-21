const Koa = require("koa");
const static = require("koa-static-history");

const app = new Koa();

app.use(
  static("./dist", {
    history: true,
  })
);

app.listen("8080", () => {
  console.log("server run!!!");
});
