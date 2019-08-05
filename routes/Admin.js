const express = require("express");
const router = express.Router();
let db;
const Seq = require("sequelize");
const Op = Seq.Op;
const Admin = require("../model/admin");
if (process.env.NODE_ENV == "production") {
  db = require("../remotedb");
} else {
  db = require("./database");
}
// const Admin = require("../sequelize");

router.get("/", (req, res) => {
  res.render("admin/login", {
    layout: "layouts/admin-login"
  });
});

router.post("/", (req, res) => {
  let { username, password } = req.body;
  if (username == "" || password == "") {
    res.render("admin/login", {
      msg: "please fill-in all fields",
      layout: "layouts/admin-login"
    });
  }

  Admin.findAll({
    where: {
      username: { [Op.like]: username },
      password: { [Op.like]: password }
    }
  })
    .then(admin => {
      if (admin != "") {
        res.render("admin/dashboard", {
          admin,
          layout: "layouts/dashboard.ejs"
        });
      } else {
        res.render("admin/login", {
          msg: "unrecognized credentials!",
          layout: "layouts/admin-login"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.render("admin/login", {
        msg: "something went wrong. Try again.",
        layout: "layouts/admin-login"
      });
    });
});

module.exports = router;
