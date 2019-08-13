const localStrategy = require("passport-local").Strategy;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const User = require("../model/users");

module.exports = function(passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        where: {
          email: { [Op.like]: email }
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
                message: "username or password is incorrecty"
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
    done(null, user.uid);
  });

  passport.deserializeUser((uid, done) => {
    User.findOne({
      where: {
        uid
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
};
