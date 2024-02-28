const express = require("express");
const router = express.Router();
const { Record, _ } = require("../services/record");
const utils = require("../services/utils");

// 需要使用 express.urlencoded 來從請求網址中獲取表單資料，否則就會回傳 undefined
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  const userId = req.user.id;
  const records = [];
  const categoryId = req.query.categoryId;
  let totalAmount = 0;
  Record.getRecords({ userId, categoryId })
    .then((datas) => {
      datas.forEach((data) => {
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
  const userId = req.user.id;
  res.render("new", {
    userId,
  });
});

router.post("/new", (req, res, next) => {
  const BODY = req.body;
  if (!utils.isValidParam(BODY, "name")) {
    next({
      redirect: "/records",
      errorMessage: "name 為必填欄位",
    });
    return;
  }
  if (!utils.isValidParam(BODY, "date")) {
    next({
      redirect: "/records",
      errorMessage: "date 為必填欄位",
    });
    return;
  }
  if (!utils.isValidParam(BODY, "amount")) {
    next({
      redirect: "/records",
      errorMessage: "amount 為必填欄位",
    });
    return;
  }
  if (!utils.isValidParam(BODY, "categoryId")) {
    next({
      redirect: "/records",
      errorMessage: "categoryId 為必填欄位",
    });
    return;
  }
  const { name, date, amount, categoryId } = BODY;
  const userId = req.user.id;
  console.log(
    `POST /records/new | name: ${name}, date: ${date}, amount: ${amount}, userId: ${userId}, categoryId: ${categoryId}`
  );
  Record.add({ name, date, amount, userId, categoryId })
    .then((record) => {
      console.log(`record: ${JSON.stringify(record)}`);
      req.flash("success", "新增支出紀錄成功!");
      return res.redirect("/records");
    })
    .catch((err) => {
      console.log(`新增支出紀錄時發生錯誤, err: ${err}`);
      next({
        redirect: "/records",
        errorMessage: `新增支出紀錄時發生錯誤, data: ${JSON.stringify(BODY)}`,
      });
      return;
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  console.log(`id: ${id}, userId: ${userId}`);
  Record.isExists(id, userId)
    .then((isExists) => {
      if (!isExists) {
        next({
          redirect: "/records",
          errorMessage: `User ${userId} 沒有 id 為 ${id} 的支出紀錄`,
        });
        return;
      }
      Record.get(id).then((record) => {
        if (!record) {
          next({
            redirect: "/records",
            errorMessage: `讀取支出紀錄(${id})時發生錯誤`,
          });
          return;
        }
        const data = Record.formatData(record);
        return res.render("edit", {
          id,
          userId,
          record: {
            name: data.name,
            date: data.date,
            amount: data.amount,
            categoryId: data.categoryId,
          },
        });
      });
    })
    .catch((error) => {
      next({
        redirect: "/records",
        errorMessage: `讀取支出紀錄時發生錯誤, error: ${error}`,
      });
      return;
    });
});

router.put("/:id", (req, res, next) => {
  const BODY = req.body;
  console.log(`BODY: ${JSON.stringify(BODY)}, type: ${typeof BODY}`);
  console.log(`name: ${BODY.name}`);
  if (!utils.isValidParam(BODY, "name")) {
    next({
      redirect: "/records",
      errorMessage: "name 為必填欄位",
    });
    return;
  }
  if (!utils.isValidParam(BODY, "date")) {
    next({
      redirect: "/records",
      errorMessage: "date 為必填欄位",
    });
    return;
  }
  if (!utils.isValidParam(BODY, "amount")) {
    next({
      redirect: "/records",
      errorMessage: "amount 為必填欄位",
    });
    return;
  }
  if (!utils.isValidParam(BODY, "categoryId")) {
    next({
      redirect: "/records",
      errorMessage: "categoryId 為必填欄位",
    });
    return;
  }
  const { name, date, amount, categoryId } = BODY;
  const userId = req.user.id;
  console.log(
    `POST /records/new | name: ${name}, date: ${date}, amount: ${amount}, userId: ${userId}, categoryId: ${categoryId}`
  );
  const id = req.params.id;
  console.log(`id: ${id}`);
  Record.isExists(id, userId)
    .then((isExists) => {
      if (!isExists) {
        next({
          redirect: "/records",
          errorMessage: `User ${userId} 沒有 id 為 ${id} 的支出紀錄`,
        });
        return;
      }
      const record = { id, name, date, amount, userId, categoryId };
      Record.update(record)
        .then((ok) => {
          console.log(`ok: ${ok}`);
          req.flash("success", "更新支出紀錄成功!");
          return res.redirect("/records");
        })
        .catch((error) => {
          next({
            redirect: "/records",
            errorMessage: `更新支出紀錄時發生錯誤, error: ${error}`,
          });
          return;
        });
    })
    .catch((error) => {
      next({
        redirect: "/records",
        errorMessage: `讀取支出紀錄時發生錯誤, error: ${error}`,
      });
      return;
    });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  Record.isExists(id, userId)
    .then((isExists) => {
      if (!isExists) {
        next({
          errorMessage: `User ${userId} 沒有 id 為 ${id} 的支出紀錄`,
        });
        return;
      }
      Record.delete(id)
        .then((ok) => {
          console.log(`delete result: ${ok}`);
          req.flash("success", "刪除支出紀錄成功!");
          return res.redirect("/records");
        })
        .catch((err) => {
          console.log(`delete err: ${err}`);
          next({
            errorMessage: `刪除支出紀錄時發生錯誤, id: ${id}`,
          });
          return;
        });
    })
    .catch((error) => {
      next({
        redirect: "/records",
        errorMessage: `讀取支出紀錄時發生錯誤, error: ${error}`,
      });
      return;
    });
});

module.exports = router;
