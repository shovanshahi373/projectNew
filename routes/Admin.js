const express = require("express");
const router = express.Router();
const Seq = require("sequelize");
const sendgrid = require("../configs/email");
const Admin = require("../model/admin");
const Users = require("../model/users");
const Complains = require("../model/complain");
const bcrypt = require("bcryptjs");
const isAdminAuthenticated = require("../configs/auth").a;
const passport = require("passport");
const uuid4 = require("uuid/v4");

router.get("/create-admin", (req, res) => {
  const id = uuid4();
  bcrypt.hash("root", 10).then(result => {
    Admin.create({
      id,
      username: "admin",
      email: "root@root.com",
      citizenship: "231232152222",
      password: result,
      image: "/uploads/admins/sovan.jpg"
    })
      .then(admin => {
        console.log("admin created");
        res.status(200).redirect("/admin");
      })
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
  console.log("admin session destroyed");
  req.flash("success_msg", "you are logged out");
  res.redirect("/admin");
});

router.get("/dashboard", isAdminAuthenticated, (req, res) => {
  res.render("admin/dashboard", {
    layout: "layouts/dashboard",
    admin: req.user
  });
});

router.post("/dashboard", (req, res, next) => {
  let { email, password } = req.body;
  if (email == "" || password == "") {
    req.flash("error_msg", "please fill in all the fields");
    res.redirect("/admin");
  }

  passport.authenticate("admin-local", (err, admin, info) => {
    if (err) {
      req.flash("error_msg", "authentication failed.");
      return res.redirect("/admin");
    }
    if (!admin) {
      req.flash("error-msg", info.message);
      return res.redirect("/admin");
    }
    req.login(admin, function(err) {
      if (err) {
        console.log("cannot log in admin ================ :", err);
        return next(err);
      }
      res.redirect("/admin/dashboard");
    });
  })(req, res, next);
});

router.get("/dashboard/getAllUsers", isAdminAuthenticated, (req, res) => {
  const search = req.query.search;
  const pat = new RegExp(search);
  console.log("================================" + req.admin);
  Users.findAll()
    .then(users => {
      const filteredusers = users.filter(user => pat.test(user.uname));
      const length = filteredusers.length;
      res.render("admin/dashboard", {
        layout: "layouts/dashboard",
        admin: req.user,
        users: filteredusers,
        search,
        length
      });
    })
    .catch(err => console.log(err));
});

router.get("/dashboard/invite", isAdminAuthenticated, (req, res) => {
  res.render("admin/invite", {
    layout: "layouts/dashboard",
    admin: req.user
  });
});

router.post("/dashboard/invite", (req, res) => {
  const { email, description } = req.body;
  const admin = req.user;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) throw err;
    const token = buffer.toString("hex");
    admin.resetToken = token;
    admin.resetTokenExpiry = Date.now() + 3600000;
    const id = admin.id;
    admin.save().then(result => {
      sendgrid(
        email,
        "sovanshahihero@gmail.com",
        "Sarokaar has invited you to join Admin Panel",
        `<h5>${description}</h5>
        <div>click <a href="http://localhost:3000/admin/register?id=${id}&token=${token}">here</a> to accept the invitation.</div>`
      );

      // req.flash("link", "email was successfully sent to " + email);
      res.redirect("/admin/dashboard");
    });
  });
});

router.get("/register?id=id&token=token", (req, res) => {
  const { id, token } = req.query;
  res.render("admin/register", {
    layout: "layouts/admin-login",
    token,
    id
  });
});

router.post("/register", (req, res) => {
  const {
    uname,
    email,
    citizenship,
    password,
    cpassword,
    token,
    id
  } = req.body;
  const pic = req.file;
  let errors = [];
  Admin.findOne({
    where: {
      id
    }
  }).then(admin => {
    if (admin) {
      if (token == admin.token && admin.resetTokenExpiry > Date.now()) {
        if (uname == "" || email == "" || citizenship == "" || password == "") {
          errors.push({ msg: "please fill in all the fields" });
        }

        if (!citizenship.match(/^[0-9]{12}$/)) {
          errors.push({ msg: "invalid citizenship format!" });
        }

        if (password.length < 6) {
          errors.push({ msg: "password must be atleast 6 characters long!" });
        }

        if (cpassword != password) {
          errors.push({ msg: "please match the password fields" });
        }

        if (!pic) {
          errors.push({ msg: "No File Selected!" });
        }

        if (errors.length > 0) {
          res.render("admin/register", {
            layout: "layouts/admin-login",
            errors,
            uname,
            email,
            citizenship,
            password,
            cpassword
          });
        }
        const imageUrl = `../uploads/admins/${pic.filename}`;
        const id = uuid4();
        const hash = bcrypt.hashSync(password, 10);
        const ccno = citizenship.split("");
        ccno.splice(7, 0, "/");
        citizenship = ccno.join("");
        Admin.create({
          id,
          username: uname,
          email,
          citizenship,
          password: hash,
          image: imageUrl
        })
          .then(admin => {
            req.flash("success_msg", "account created. Login to continue");
            res.redirect("/admin");
          })
          .catch(err => console.log(err));
      }
    } else {
      res.status(422).send("failed to authenticate...");
    }
  });
});

router.get("/dashboard/complaints", isAdminAuthenticated, (req, res) => {
  const search = req.query.search;
  const status = req.query.restrict;
  const pat = new RegExp(search);
  Complains.findAll({
    order: [["dateCreated", "ASC"]]
  })
    .then(complains => {
      let filteredcomplains = complains.filter(complain =>
        pat.test(complain.title)
      );
      const length = filteredcomplains.length;
      if (status == "pending") {
        filteredcomplains = filteredcomplains.filter(
          complain => complain.isCompleted == 0
        );
      }
      if (status == "completed") {
        filteredcomplains = filteredcomplains.filter(
          complain => complain.isCompleted == 1
        );
      }
      res.render("admin/dashboard", {
        layout: "layouts/dashboard",
        complains: filteredcomplains,
        admin: req.user,
        search,
        length
      });
    })
    .catch(err => console.log(err));
});

router.get("/dashboard/settings", isAdminAuthenticated, (req, res) => {
  res.render("admin/settings", {
    admin: req.user,
    layout: "layouts/dashboard"
  });
});

router.post("/dashboard/settings", (req, res) => {
  const { username, email, password, cpassword, image } = req.body;
  const pic = req.file;
  Admin.findOne({
    where: {
      id: req.user.id
    }
  }).then(admin => {
    if (pic) {
      image = `../uploads/admins/${pic.filename}`;
    }
    if (admin) {
      if (password) {
        if (password.length > 6 && password === cpassword) {
          hash = bcrypt.hashSync(password, 10);
          admin.username = username;
          admin.email = email;
          admin.password = hash;
          admin.image = image;
          admin.save().then(result => {
            if (result.email != email) {
              req.logOut();
              req.flash("success_msg", "successfully changed admin info");
              res.redirect("/admin");
            }
          });
        } else {
          req.flash("error_msg", "please match both passwords");
          res.redirect("/admin/dashboard");
        }
      }
      admin.username = username;
      admin.email = email;
      admin.image = image;
      admin
        .save()
        .then(result => {
          if (result.username != username || result.email != email) {
            req.flash("success_msg", "successfully changed admin info");
            res.redirect("/admin");
          }
          req.flash("success_msg", "success :)");
          res.redirect("/admin/dashboard");
        })
        .catch(err => console.log(err));
    }
  });
});

router.get(
  "/dashboard/complaints/find/:id",
  isAdminAuthenticated,
  (req, res) => {
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
          admin: req.user,
          googleMap: process.env.GOOGLE_API_KEY
        });
      })
      .catch(err => console.log(err));
  }
);

//mark/unmark user complaint
router.get(
  "/dashboard/complaints/mark/:cid",
  isAdminAuthenticated,
  (req, res) => {
    const post = req.params.cid;
    const admin = req.user;
    Complains.findOne({
      where: {
        cid: post
      }
    })
      .then(complain => {
        complain.isCompleted = !complain.isCompleted;
        if (complain.isCompleted) {
          complain.markedBy = admin.username;
        } else {
          complain.markedBy = "";
        }
        complain
          .save()
          .then(result => {
            res.redirect("/admin/dashboard/complaints");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
);

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
