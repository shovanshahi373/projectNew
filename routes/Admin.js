const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  res.render("admin/login", {
    title: "admin login panel",
    layout: "layouts/admins"
  });
});

router.post("/", (req, res) => {
  let a = req.body.username;
  let b = req.body.password;
  if (a == "" || b == "") {
    res.render("admin/login", {
      title: "admin not found",
      msg: "please fill-in all fields",
      layout: "layouts/admins"
    });
  }
  let query = `SELECT * FROM admins WHERE userName="${a}" AND password="${b}"`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result == "") {
      res.render("admin/login", {
        title: "admin not found",
        msg: "unauthorized username!",
        layout: "layouts/admins"
      });
    } else {
      console.log("user found...");
      res.render("admin/dashboard", {
        title: "Sarokaar | Dashboard",
        admin: result,
        layout: "layouts/dashboard.ejs"
      });
      console.log(result);
    }
  });
});

module.exports = router;
