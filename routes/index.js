const express = require("express");
const router = express.Router();

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid",
};

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/:id", (req, res) => {
  res.render("edit", {
    record: {
      name: "Dad",
      date: "2015-02-01",
      amount: 379,
    },
  });
});

module.exports = router;
