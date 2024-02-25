const express = require("express");
const router = express.Router();
const { Record, _ } = require("../../services/record");

router.get("/", (req, res) => {
  const userId = req.query.userId;
  const categoryId = req.query.categoryId;
  let totalAmount = 0;
  const records = [];
  Record.getRecords(userId, categoryId)
    .then((datas) => {
      datas.forEach((data) => {
        console.log(`data: ${JSON.stringify(data)}`);
        totalAmount += Number(data.amount);
        data = Record.formatData(data);
        records.push(data);
      });
      res.json({ records, totalAmount });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.post("/new", (req, res) => {
  const { name, date, amount, userId, categoryId } = req.body;
  console.log(
    `name: ${name}, date: ${date}, amount: ${amount}, userId: ${userId}, categoryId: ${categoryId}`
  );
  if (name === "") {
    return res.status(400).json({
      msg: "name 為必填欄位",
    });
  }
  if (date === "") {
    return res.status(400).json({
      msg: "date 為必填欄位",
    });
  }
  if (amount === "") {
    return res.status(400).json({
      msg: "amount 為必填欄位",
    });
  }
  if (userId === "") {
    return res.status(400).json({
      msg: "userId 為必填欄位",
    });
  }
  if (categoryId === "") {
    return res.status(400).json({
      msg: "categoryId 為必填欄位",
    });
  }
  Record.add({ name, date, amount, userId, categoryId })
    .then((record) => {
      res.json(record);
    })
    .catch((err) => {
      console.log(`新增支出紀錄時發生錯誤, err: ${err}`);
      res.status(500).json({ err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Record.get(id)
    .then((record) => {
      res.json(record);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, date, amount, userId, categoryId } = req.body;
  console.log(
    `id: ${id}, name: ${name}, date: ${date}, amount: ${amount}, userId: ${userId}, categoryId: ${categoryId}`
  );
  if (name === "") {
    return res.status(400).json({
      msg: "name 為必填欄位",
    });
  }
  if (date === "") {
    return res.status(400).json({
      msg: "date 為必填欄位",
    });
  }
  if (amount === "") {
    return res.status(400).json({
      msg: "amount 為必填欄位",
    });
  }
  if (userId === "") {
    return res.status(400).json({
      msg: "userId 為必填欄位",
    });
  }
  if (categoryId === "") {
    return res.status(400).json({
      msg: "categoryId 為必填欄位",
    });
  }
  Record.isExists(id)
    .then((isExists) => {
      if (!isExists) {
        return res.status(404).json({
          msg: `沒有 id 為 ${id} 的支出紀錄`,
        });
      }
      const record = { id, name, date, amount, userId, categoryId };
      Record.update(record)
        .then((ok) => {
          if (ok) {
            res.json(record);
          } else {
            res.status(500).json({ err: "更新支出紀錄失敗" });
          }
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Record.isExists(id)
    .then((isExists) => {
      if (!isExists) {
        return res.status(404).json({
          msg: `沒有 id 為 ${id} 的支出紀錄`,
        });
      }
      Record.delete(id)
        .then((ok) => {
          if (ok) {
            res.json({ msg: "刪除支出紀錄成功" });
          } else {
            res.status(500).json({ err: "刪除支出紀錄失敗" });
          }
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

module.exports = router;
