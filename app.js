const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  require("dotenv").config();
}

const passport = require("./config/passport");

// 載入中間件
const loginedHandler = require("./middlewares/logined-handler");
const messageHandler = require("./middlewares/message-handler");
const errorHandler = require("./middlewares/error-handler");

const router = require("./routes");
const app = express();
const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// 「覆寫 (override)」HTTP 方法，允許表單傳送 GET 和 POST 以外的方法
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// 登入驗證
app.use(passport.initialize());
app.use(passport.session());

// 訊息處理
app.use(messageHandler);

// 路由處理
app.use(router);

// 錯誤處理
app.use(errorHandler);

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
