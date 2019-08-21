const express = require("express");
const router = express.Router();
const Seq = require("sequelize");
const db = require("../configs/database");
const Admin = require("../model/admin");
const Users = require("../model/users");
const Complains = require("../model/complain");
const bcrypt = require("bcryptjs");
const { ensureAuthenticatedAdmin } = require("../configs/auth");
const passport = require("passport");
const uuid4 = require("uuid/v4");

const id = uuid4();
router.get("/create-admin", (req, res) => {
  bcrypt.hash("root", 10).then(result => {
    Admin.create({
      id,
      username: "admin",
      email: "root@root.com",
      citizenship: "23123215efsd",
      password: result,
      image: "/images/sovan.jpg"
    })
      .then(admin => console.log("admin created"))
      .catch(err => console.log(err));
  });
});

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

router.get("/dashboard/complaints", (req, res) => {
  Complains.findAll({
    order:[
      ['dateCreated','ASC']
    ]
  })
  .then(complains => {
    res.render("admin/dashboard", {
      layout: "layouts/dashboard",
      complains,
      admin: req.session.admin
    });
  })
  .catch(err => console.log(err));


  // db.query("Select * from complains,users")
  //   .then(complains => {
  //     console.log(complains);
  //     res.render("admin/dashboard", {
  //       layout: "layouts/dashboard",
  //       complains: complains[0],
  //       admin: req.session.admin
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});
router.get("/dashboard/complaints/find/:id", (req, res) => {
  const post = req.params.id;
  Complains.findOne({
    where: {
      cid: post
    }
  })
    .then(post => {
      const url = post.image.split("..")[1];
      res.render("admin/dashboard", {
        post,
        url,
        layout: "layouts/dashboard",
        admin: req.session.admin
      });
    })
    .catch(err => console.log(err));
});

//mark/unmark user complaint
router.get("/dashboard/complaints/mark/:cid", (req, res) => {
  const post = req.params.cid;
  Complains.findOne({
    where: {
      cid: post
    }
  })
  .then(ismark => {
    ismark.isCompleted = !ismark.isCompleted;
    ismark.save()
    .then(result => {
      res.redirect('/admin/dashboard/complaints');

    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });

});

//delete user complaint
router.post("/dashboard/complaints/delete/:cid", (req, res) => {
  const pid = req.params.cid;
  Complains.destroy({
    where: {
      cid: pid
    }
  })
    .then(result => {
      console.log("post " + pid + " was deleted...");
      res.redirect("/admin/dashboard/complaints");
    })
    .catch(err => console.log(err));
});

module.exports = router;
