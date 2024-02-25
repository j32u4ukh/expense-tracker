const express = require("express");
const router = express.Router();
const { Record, CATEGORY } = require("../services/record");
const utils = require("../services/utils");

// 需要使用 express.urlencoded 來從請求網址中獲取表單資料，否則就會回傳 undefined
router.use(express.urlencoded({ extended: true }));

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

router.post("/new", (req, res) => {
  const BODY = req.body;
  console.log(`BODY: ${JSON.stringify(BODY)}, type: ${typeof BODY}`);
  console.log(`name: ${BODY.name}`);
  if (!utils.isValidParam(BODY, "name")) {
    console.log("name 為必填欄位");
    return;
  }
  if (!utils.isValidParam(BODY, "date")) {
    console.log("date 為必填欄位");
    return;
  }
  if (!utils.isValidParam(BODY, "amount")) {
    console.log("amount 為必填欄位");
    return;
  }
  if (!utils.isValidParam(BODY, "userId")) {
    console.log("userId 為必填欄位");
    return;
  }
  if (!utils.isValidParam(BODY, "categoryId")) {
    console.log("categoryId 為必填欄位");
    return;
  }
  const { name, date, amount, userId, categoryId } = BODY;
  console.log(
    `POST /records/new | name: ${name}, date: ${date}, amount: ${amount}, userId: ${userId}, categoryId: ${categoryId}`
  );
  Record.add({ name, date, amount, userId, categoryId })
    .then((record) => {
      console.log(`record: ${JSON.stringify(record)}`);
    })
    .catch((err) => {
      console.log(`新增支出紀錄時發生錯誤, err: ${err}`);
    })
    .finally(() => {
      res.redirect("/records");
    });
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
