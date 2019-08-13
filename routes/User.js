const express = require("express");
const router = express.Router();
const User = require("../model/users");
const Seq = require("sequelize");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Op = Seq.Op;
let db;
if (process.env.NODE_ENV == "production") {
  db = require("../remotedb");
} else {
  db = require("../database");
}

router.get("/login", (req, res) => {
  res.render("users/login", {
    title: "Sarokaar | Login",
    layout: "layouts/layout2.ejs"
  });
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  let errors = [];

  if (email == "" || password == "") {
    errors.push({ msg: "please fill all the fields" });
    res.render("users/login", {
      errors,
      title: "Sarokaar | Login",
      layout: "layouts/layout2.ejs"
    });
  }

  passport.authenticate("local", {
    successRedirect: "/user/home",
    failureRedirect: "/user/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/home", (req, res) => {
  res.render("users/home", {
    layout: "layouts/users"
  });
});

router.get("/register", (req, res) => {
  res.render("users/register", {
    title: "register",
    layout: "layouts/layout2.ejs"
  });
});

router.post("/register", (req, res) => {
  let { uname, email, mobile, password, cpassword } = req.body;
  let errors = [];

  if (uname == "" || email == "" || mobile == "" || password == "") {
    errors.push({ msg: "please fill in all the fields" });
  }

  if (!mobile.match(/^[0-9]{10}$/)) {
    errors.push({ msg: "mobile number should be 10 digit" });
  }

  if (password.length < 6) {
    errors.push({ msg: "password must be atleast 6 characters long!" });
  }

  if (cpassword != password) {
    errors.push({ msg: "please match the password fields" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      title: "registration invalid",
      layout: "layouts/layout2.ejs",
      errors,
      uname,
      email,
      mobile,
      password,
      cpassword
    });
  } else {
    User.findOne({
      where: {
        email: { [Op.like]: email }
      }
    })
      .then(user => {
        if (!user) {
          const hash = bcrypt.hashSync(password, 10);
          password = hash;
          User.create({
            uname,
            email,
            mobile,
            password
          })
            .then(user => {
              req.flash(
                "success_msg",
                "successfully registered. login to contiue"
              );
              res.redirect("/user/login");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          errors.push({ msg: "email already exists in our system" });
          res.render("users/register", {
            layout: "layouts/layout2",
            errors,
            title: "invalid entries"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
});

module.exports = router;
