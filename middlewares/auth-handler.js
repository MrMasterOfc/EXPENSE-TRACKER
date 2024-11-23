module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "You haven't logged in yet.");
  return res.redirect("/login");
};
