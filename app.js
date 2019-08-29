require("dotenv").config();
require("./configs/database");
const Sequelize = require("sequelize");
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const pass = require("./configs/passport");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const User = require("./model/users");
const Location = require("./model/location");
const Complain = require("./model/complain");
const Resource = require("./model/resource");
const ComplainResource = require("./model/ComplainResource");

Complain.belongsTo(Location, { constraints: true, onDelete: "CASCADE" });
Complain.belongsToMany(Resource, { through: "ComplainResource" });
Complain.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

require("./configs/database").sync({ force: false });

//init app
const app = express();

// app.use(favicon(__dirname + "/resources/images/assets/icon.ico"));
app.use(favicon(path.join(__dirname, "resources/images/assets/favicon.ico")));

//configure passports for user and admin login
pass(passport);

//set up assets directory
app.use(express.static(path.join(__dirname, "resources")));

app.use(morgan("dev"));
app.use(cookieParser());
//body parser

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
//session
app.use(
  session({
    secret: "keyboardcat",
    resave: true,
    saveUninitialized: true
    // expires: -1
  })
);

//multer config
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resources/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("myImage")
);

//init passport
app.use(passport.initialize());
app.use(passport.session());
//flash
app.use(flash());
//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.link = req.flash("link");
  // res.locals.user = req.user || null;
  // res.locals.admin = req.admin || null;
  next();
});

//set routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/User"));
app.use("/admin", require("./routes/Admin"));

//error page
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/resources/html/error.html");
});

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is running on port ${port}`);
});
