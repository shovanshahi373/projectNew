const localStrategy = require("passport-local").Strategy;
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const Admin = require("../model/admin");

module.exports = {
  userAuth: function(passport) {
    passport.use(
      "user-local",
      new localStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({
          where: {
            email
          }
        })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: "that email is not registerd"
              });
            }

            bcrypt.compare(password, user.password, (err, ismatched) => {
              if (err) throw err;
              if (ismatched) {
                console.log("user password matches!!!!!");
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "username or password is incorrect"
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
    );

    passport.serializeUser((user, done) => {
      console.log(
        "=====================setting user in cookie=========================="
      );
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      console.log(
        "=======================getting user from cookie========================"
      );
      User.findOne({
        where: {
          id
        }
      })
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  adminAuth: function(passport) {
    passport.use(
      "admin-local",
      new localStrategy({ usernameField: "email" }, (email, password, done) => {
        Admin.findOne({
          where: {
            email
          }
        })
          .then(admin => {
            if (!admin) {
              return done(null, false, {
                message: "unauthorized email!"
              });
            }

            bcrypt.compare(password, admin.password, (err, ismatched) => {
              if (err) throw err;
              if (ismatched) {
                console.log("admin password matches!!!!!");
                return done(null, admin);
              } else {
                return done(null, false, {
                  message: "username or password is incorrect"
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
    );

    passport.serializeUser((admin, done) => {
      console.log(
        "=================setting admin in cookie======================"
      );
      done(null, admin.id);
    });

    passport.deserializeUser((id, done) => {
      console.log(
        "================= getting admin from cookie======================"
      );
      Admin.findOne({
        where: {
          id
        }
      })
        .then(admin => {
          done(null, admin);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
