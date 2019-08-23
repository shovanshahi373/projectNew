module.exports.u = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "unauthorized user!");
  res.redirect("/user/login");
};

module.exports.a = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "unauthorized admin!");
  res.redirect("/admin");
};
