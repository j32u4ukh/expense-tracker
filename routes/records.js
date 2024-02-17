const express = require("express");
const router = express.Router();
const Record = require("../services/record");

router.get("/", (req, res) => {
  res.render("index", {
    totalAmount: 25260,
  });
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
