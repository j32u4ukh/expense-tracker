const express = require("express");
const router = express.Router();
const { Record, CATEGORY } = require("../services/record");

router.get("/", (req, res) => {
  let totalAmount = 0;
  const records = [];
  Record.getRecords({ userId: 1 })
    .then((datas) => {
      datas.forEach((data) => {
        console.log(`data: ${JSON.stringify(data)}`);
        totalAmount += Number(data.amount);
        data = Record.formatData(data);
        records.push(data);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      res.render("index", { totalAmount, records });
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
