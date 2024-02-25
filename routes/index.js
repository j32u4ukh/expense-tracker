const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const authHandler = require("../middlewares/auth-handler");

// 支出記錄路由 API
const apis = require("./apis/index");
router.use("/apis", apis);

// 支出記錄路由
const records = require("./records");
router.use("/records", authHandler, records);

// 支出記錄路由
const auth = require("./auth");
router.use("/", auth);

// 用戶相關路由
const users = require("./users");
router.use("/users", users);

module.exports = router;
