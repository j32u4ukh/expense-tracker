const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// 使用 express.json() 中間件來解析 POST 請求的 JSON 數據
app.use(express.json());

const router = require("./routes");
app.use(router);

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
