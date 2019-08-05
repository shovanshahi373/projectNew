const express = require("express");
const router = express.Router();
const User = require("../model/users");
const Seq = require("sequelize");
const bcrypt = require("bcryptjs");
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

router.post("/login", (req, res) => {
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

  User.findOne({
    where: {
      email: { [Op.like]: email }
    }
  })
    .then(user => {
      if (user) {
        let hash = user.password;
        bcrypt
          .compare(password, hash)
          .then(result => {
            if (result) {
              console.log("password matches " + result);
              res.render("users/home", {
                user,
                layout: "layouts/users"
              });
            } else {
              errors.push({ msg: "email or password did not match" });
              res.render("users/login", {
                title: "Sarokaar | Login",
                layout: "layouts/layout2.ejs",
                errors
              });
            }
          })
          .catch(err => console.log("error: " + err));
      } else {
        errors.push({ msg: "user doesn't exist" });
        res.render("users/login", {
          title: "Sarokaar | Login",
          layout: "layouts/layout2.ejs",
          errors
        });
      }
    })
    .catch(err => {
      console.log(err);
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
          // bcrypt.genSalt(10, (err, salt) => {
          //   bcrypt.hash(password, salt, (err, hash) => {
          //     if (err) throw err;
          //     password = hash;
          //   });
          // });
          const hash = bcrypt.hashSync(password, 10);
          password = hash;
          User.create({
            uname,
            email,
            mobile,
            password
          })
            .then(user => {
              res.render("users/login", {
                layout: "layouts/layout2.ejs",
                title: "Sarokaar | login"
              });
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
