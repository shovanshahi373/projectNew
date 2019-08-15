const express = require("express");
const router = express.Router();
const Seq = require("sequelize");
const Admin = require("../model/admin");
const Users = require("../model/users");
// const Complains = require("../model/complain");
const bcrypt = require("bcryptjs");
const { ensureAuthenticatedAdmin } = require("../configs/auth");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("admin/login", {
    layout: "layouts/admin-login"
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "you are logged out");
  res.redirect("/admin");
  // req.session.destroy();
  console.log(req.session);
});

router.get("/dashboard", ensureAuthenticatedAdmin, (req, res) => {
  console.log(req.session);
  res.render("admin/dashboard", {
    layout: "layouts/dashboard",
    admin: req.session.admin
  });
});

router.post("/", (req, res, next) => {
  let { email, password } = req.body;
  if (email == "" || password == "") {
    req.flash("error_msg", "please fill in all the fields");
    res.redirect("/admin");
  }

  passport.authenticate("admin-local", (err, admin, info) => {
    if (err) {
      req.flash("error_msg", "authentication failed.");
      res.redirect("/admin");
    }
    if (admin) {
      req.session.admin = admin;
      res.render("admin/dashboard", {
        admin,
        layout: "layouts/dashboard"
      });
      // res.redirect("/admin/dashboard");
    } else {
      req.flash("error_msg", info.message);
      res.redirect("/admin");
    }
  })(req, res, next);
});

router.get("/dashboard/getAllUsers", (req, res) => {
  Users.findAll({ raw: true })
    .then(users => {
      console.log(req.session);
      res.render("admin/dashboard", {
        admin: req.session.admin,
        layout: "layouts/dashboard",
        users
      });
    })
    .catch(err => console.log(err));
});

// router.get("/dashboard/complaints", (req, res) => {
//   Complains.findAll({ raw: true })
//     .then(complains => {
//       res.render("admin/dashboard", {
//         admin: req.session.admin,
//         layout: "layouts/dashboard",
//         complains
//       });
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
