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
  res.render("new", {
    userId,
  });
});

router.post("/new", (req, res) => {
  const BODY = req.body;
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
  const id = req.params.id;
  const userId = 1;
  Record.isExists(id)
    .then((isExists) => {
      if (!isExists) {
        console.log(`沒有 id 為 ${id} 的支出紀錄`);
        return res.redirect("/records");
      }
      Record.get(id).then((record) => {
        if (!record) {
          return res.redirect("/records");
        }
        const data = Record.formatData(record);
        return res.render("edit", {
          id,
          userId,
          record: {
            name: data.name,
            date: data.date,
            amount: data.amount,
          },
        });
      });
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      return res.redirect("/records");
    });
});

router.put("/:id", (req, res) => {
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
  const id = req.params.id;
  console.log(`id: ${id}`);
  Record.isExists(id)
    .then((isExists) => {
      if (!isExists) {
        console.log(`沒有 id 為 ${id} 的支出紀錄`);
        return res.redirect("/records");
      }
      const record = { id, name, date, amount, userId, categoryId };
      Record.update(record)
        .then((ok) => {
          console.log(`ok: ${ok}`);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        })
        .finally(() => {
          return res.redirect("/records");
        });
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Record.isExists(id)
    .then((isExists) => {
      if (!isExists) {
        console.log(`沒有 id 為 ${id} 的支出紀錄`);
        return res.redirect("/records");
      }
      Record.delete(id)
        .then((ok) => {
          console.log(`delete result: ${ok}`);
        })
        .catch((err) => {
          console.log(`delete err: ${err}`);
        })
        .finally(() => {
          return res.redirect("/records");
        });
    })
    .catch((error) => {
      console.log(`delete error: ${error}`);
      return res.redirect("/records");
    });
});

module.exports = router;
