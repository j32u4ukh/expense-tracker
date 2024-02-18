const express = require("express");
const router = express.Router();
const User = require("../../services/user");

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log(`name: ${name}, email: ${email}, password: ${password}`);
  if (name === "") {
    return res.status(400).json({
      msg: "name 為必填欄位",
    });
  }
  if (email === "") {
    return res.status(400).json({
      msg: "email 為必填欄位",
    });
  }
  if (password === "") {
    return res.status(400).json({
      msg: "password 為必填欄位",
    });
  }
  // if (password !== confirm) {
  //   return res.status(400).json({
  //     msg: "Password 和 Confirm password 不相同",
  //   });
  // }
  User.isExists({ name, email, password })
    .then((isExists) => {
      if (isExists) {
        return res.status(409).json({
          msg: `email: ${email} 已存在`,
        });
      } else {
        User.add({ name, email, password })
          .then((user) => {
            return res.json(user);
          })
          .catch((error) => {
            console.log(`建立新用戶時發生錯誤, error: ${error}`);
            return res.status(500).json({
              msg: "建立新用戶時發生錯誤",
            });
          });
      }
    })
    .catch((error) => {
      console.log(`檢查用戶是否存在時發生錯誤, error: ${error}`);
      return res.status(500).json({
        msg: "檢查用戶是否存在時發生錯誤",
      });
    });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  User.get({ id })
    .then((user) => {
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({
          msg: `沒有 id 為 ${id} 的用戶`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

module.exports = router;
