const express = require("express");
const router = express.Router();
let db;
const Seq = require("sequelize");
const Op = Seq.Op;
const Admin = require("../model/admin");
const Users = require("../model/users");
const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV == "production") {
  db = require("../remotedb");
} else {
  db = require("../database");
}
// const Admin = require("../sequelize");

router.get("/", (req, res) => {
  res.render("admin/login", {
    layout: "layouts/admin-login"
  });
});

// router.post("/register", (req, res) => {
//   Admin.create({
//     username: "root",
//     email: "root@root",
//     citizenship: "1111111111",
//     password: "root"
//   })
//     .then(result => {
//       if (result) {
//         console.log("user created!");
//       } else {
//         console.log("user did not create");
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

router.get("/logout", (req, res) => {
  res.send("logged out");
});

router.get("/getAllUsers", (req, res) => {
  Users.findAll().then(users => {
    res
      .redirect("admin/dashboard", {
        admin,
        users,
        layout: "layouts/dashboard.ejs"
      })
      .catch(err => {
        console.log(err);
      });
  });
  res.send("view for getting all users goes here");
  // res.render('admin/dashboard',{
  //   admin,
  //   layout: "layouts/dashboard.ejs"
  // })
});

router.post("/", (req, res) => {
  let { email, password } = req.body;
  if (email == "" || password == "") {
    res.render("admin/login", {
      msg: "please fill-in all fields",
      layout: "layouts/admin-login"
    });
  }

  Admin.findOne({
    attributes: ["username", "email", "password", "image"],
    where: {
      email,
      password
    }
  })
    .then(admin => {
      if (admin) {
        res.render("admin/dashboard", {
          admin,
          layout: "layouts/dashboard.ejs"
        });
        // bcrypt
        //   .compare(password, admin.password)
        //   .then(result => {
        //     if (result) {
        //       res.render("admin/dashboard", {
        //         admin,
        //         layout: "layouts/dashboard.ejs"
        //       });
        //     } else {
        //       res.render("admin/login", {
        //         layout: "layouts/admin-login",
        //         msg: "invalid email or password"
        //       });
        //     }
        //   })
        //   .catch(err => {
        //     console.log("error " + err);
        //   });
      } else {
        res.render("admin/login", {
          msg: "invalid email or password",
          layout: "layouts/admin-login"
        });
      }
    })
    .catch(err => {
      console.log("error: " + err);
    });
});

module.exports = router;
