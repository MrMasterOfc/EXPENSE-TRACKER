module.exports = (error, req, res, next) => {
  console.error(error);
  req.flash("error", error.errorMessage || "Failed to load");
  res.redirect("back");

  next(error);
};
