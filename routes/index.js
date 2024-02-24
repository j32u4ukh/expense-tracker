const express = require("express");
const router = express.Router();

// 支出記錄路由 API
const apis = require("./apis/index");
router.use("/apis", apis);

// 支出記錄路由
const records = require("./records");
router.use("/records", records);

router.get("/", (req, res) => {
  return res.redirect("/login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
