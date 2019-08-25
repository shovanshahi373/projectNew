const localStrategy = require("passport-local").Strategy;
// const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const Admin = require("../model/admin");

module.exports = function(passport) {
  //stategy for user login
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

  //strategy for admin login
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

  passport.serializeUser((entity, done) => {
    if (entity instanceof User) {
      // entity["type"] = "User";
      console.log("============setting user==========");
      // console.log(entity);
      // done(null, entity);
      done(null, { id: entity.id, type: "User" });
    } else if (entity instanceof Admin) {
      // entity["type"] = "Admin";
      console.log("============setting admin==========");
      // console.log(entity);
      // console.log(entity.id,entity.type);
      // done(null, entity);
      done(null, { id: entity.id, type: "Admin" });
    }
  });

  passport.deserializeUser((entity, done) => {
    if (entity.type === "User") {
      console.log(entity);
      console.log("=============getting user============");
      User.findOne({
        where: {
          id: entity.id
        }
      })
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (entity.type === "Admin") {
      console.log(entity);
      console.log("===========getting admin============");
      Admin.findOne({
        where: {
          id: entity.id
        }
      })
        .then(admin => {
          done(null, admin);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
};
