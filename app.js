const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");

const app = express();
const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// 「覆寫 (override)」HTTP 方法，允許表單傳送 GET 和 POST 以外的方法
app.use(methodOverride("_method"));

const router = require("./routes");
app.use(router);

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
