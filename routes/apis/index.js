const express = require("express");
const router = express.Router();

// 使用 express.json() 中間件來解析 POST 請求的 JSON 數據
router.use(express.json());

// 支出記錄
const records = require("./records");
router.use("/records", records);

// 用戶數據
const users = require("./users");
router.use("/users", users);

module.exports = router;
