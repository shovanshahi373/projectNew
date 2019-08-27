const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const Admin = require("../model/admin");
const gender = require("gender-api-client");

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

  passport.use(
    new GoogleStrategy(
      {
        callbackURL:
          process.env.NODE_ENV != "production"
            ? process.env.GOOGLE_API_REDIRECT
            : process.env.GOOGLE_API_REDIRECT_REMOTE,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        console.log(profile.gender);
        const email = profile.emails[0].value;
        const name = profile.name.givenName;
        console.log(email);
        console.log(name);
        const getgender = gender([name], (err, genders) => {
          if (err) {
            console.log("========" + err);
          }
          return genders[name];
        });
        const savegender = getgender == "male" ? 1 : 0;
        User.findOne({
          where: {
            email
          }
        })
          .then(user => {
            if (user) {
              done(null, user);
            } else {
              User.create({
                id: profile.id,
                uname: profile.displayName,
                email,
                password: "-",
                gender: savegender,
                image: profile.photos[0].value
              })
                .then(user => {
                  console.log(user);
                  done(null, user);
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));

        const xx = {
          id: profile.id,
          uname: profile.displayName,
          email,
          gender: savegender,
          image: profile.photos[0].value
        };
        console.log(xx);
      }
    )
  );

  passport.serializeUser((entity, done) => {
    if (entity instanceof User) {
      const user = {
        id: entity.id,
        type: "User"
      };
      // done(null, { id: entity.id, type: "User" });
      console.log("========serializing " + entity + " in cookie...=======");
      done(null, user);
    } else if (entity instanceof Admin) {
      const admin = {
        id: entity.id,
        type: "Admin"
      };
      console.log("========serializing " + entity + " in cookie...=======");
      // done(null, {id: entity.id,type: "Admin"});
      done(null, admin);
    }
  });

  passport.deserializeUser((entity, done) => {
    const Model = entity.type === "Admin" ? Admin : User;
    Model.findOne({
      where: {
        id: entity.id
      }
    })
      .then(result => {
        if (result) {
          console.log(
            "========deserializing " + result + " from cookie...======="
          );
          done(null, result);
        }
      })
      .catch(err => console.log(err));
  });
};
