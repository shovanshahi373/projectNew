const express = require("express");
const router = express.Router();
const User = require("../model/users");

router.get("/login", (req, res) => {
  res.render("users/login", {
    title: "login",
    layout: "layouts/main.ejs"
  });
});

router.post("/login", (req, res) => {
  res.render("users/login", {
    title: "login",
    layout: "layouts/main.ejs"
  });
});

router.get("/register", (req, res) => {
  res.render("users/register", {
    title: "register",
    layout: "layouts/main.ejs",
    user: new User()
  });
});

router.post("/register", (req, res) => {
  let { fname, lname, email, mobile, password } = req.body;
  // if(fname !== '' && fname.match(/^[a-zA-Z]{3,}$/)) {

  // }
  res.render("index", {
    title: "Sarokaar",
    msg: "you are successgully registered",
    layout: "layouts/main.ejs",
    fname,
    lname
  });
});

module.exports = router;
