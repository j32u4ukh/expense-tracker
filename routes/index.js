const express = require("express");
const router = express.Router();

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid",
};

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
