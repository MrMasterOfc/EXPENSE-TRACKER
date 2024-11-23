// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const passport = require("passport");

const expenses = require("./expenses");
const users = require("./users");

const authHandler = require("../middlewares/auth-handler");
router.use("/Expense-Tracker", authHandler, expenses);
router.use("/users", users);

router.get("/", (req, res) => {
  res.redirect("/Expense-Tracker");
});

router.get("/register", (req, res) => {
  return res.render("register");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/register", (req, res) => {
  return res.send(req.body);
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/Expense-Tracker",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/oauth2/redirect/facebook",
  passport.authenticate("facebook", {
    successRedirect: "/Expense-Tracker",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    return res.redirect("/login");
  });
});

// 匯出路由器
module.exports = router;
