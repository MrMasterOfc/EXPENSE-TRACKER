// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

router.post("/", async (req, res, next) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (!email || !password) {
      req.flash("error", "email and password are required");
      return res.redirect("back");
    }

    if (password !== confirmPassword) {
      req.flash("error", "Password confirmation does not match.");
      return res.redirect("back");
    }

    const rowCount = await User.count({ where: { email } });
    if (rowCount > 0) {
      req.flash("error", "Email has already been registered.");
      return res.redirect("back");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hash });

    if (!user) {
      return res.redirect("back");
    }

    req.flash("success", "Successfully registered.");
    return res.redirect("/login");
  } catch (error) {
    error.errorMessage = "Failed to register.";
    next(error);
  }
});

module.exports = router;
