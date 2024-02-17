const express = require("express");
const router = express.Router();

// 支出記錄
const records = require("./records");
router.use("/records", records);

module.exports = router;
