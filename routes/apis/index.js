const express = require("express");
const router = express.Router();

// 支出記錄
const records = require("./records");
router.use("/records", records);

// 用戶數據
const users = require("./users");
router.use("/users", users);

module.exports = router;
