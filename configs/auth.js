module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "request denied. log in first...");
    res.redirect("/user/login");
  },

  ensureAuthenticatedAdmin: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "request denied. log in first.");
    res.redirect("/admin");
  }
};
