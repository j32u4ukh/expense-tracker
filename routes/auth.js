const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// 需要使用 express.urlencoded 來從請求網址中獲取表單資料，否則就會回傳 undefined
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/records");
  } else {
    return res.redirect("/login");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/records",
    failureRedirect: "/login",
    failureFlash: true,
  })
  // (req, res) => {
  //   console.log(`body: ${JSON.stringify(req.body)}`);
  // }
);
router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/oauth2/redirect/facebook",
  passport.authenticate("facebook", {
    successRedirect: "/records",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error);
    }
    return res.redirect("/login");
  });
});

module.exports = router;
