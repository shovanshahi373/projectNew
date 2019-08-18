const localStrategy = require("passport-local").Strategy;
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const Admin = require("../model/admin");

module.exports = {
  userAuth: function(passport) {
    passport.use(
      "user-local",
      new localStrategy(
        { usernameField: "email", passReqToCallback: true },
        (req, email, password, done) => {
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
                  console.log("password matches!!!!!");
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
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
      User.findOne({
        where: {
          email
        }
      })
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  adminAuth: function(passport) {
    passport.use(
      "admin-local",
      new localStrategy(
        { usernameField: "email", passReqToCallback: true },
        (req, email, password, done) => {
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
                  console.log("password matches!!!!!");
                  return done(null, admin);
                } else {
                  console.log("password not matched!!!");
                  return done(null, false, {
                    message: "username or password is incorrect"
                  });
                }
              });

              // return done(null, admin);
            })
            .catch(err => {
              console.log(err);
            });
        }
      )
    );

    passport.serializeUser((admin, done) => {
      done(null, admin.id);
    });

    passport.deserializeUser((id, done) => {
      Admin.findOne({
        where: {
          id
        }
      })
        .then(admin => {
          if (admin) {
            done(null, admin);
          } else {
            done(null, false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
