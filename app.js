let db;
const Sequelize = require("sequelize");

if (process.env.NODE_ENV == "production") {
  db = new Sequelize("cpVJB15QPr", "cpVJB15QPr", "LgzpbTew0b", {
    host: "37.59.55.185",
    dialect: "mysql",
    operatorAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  });
} else {
  db = require("./database");
}
const express = require("express");
const path = require("path");
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");
// const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
// const userModel = require('./model/users');
const port = process.env.PORT || 3000;

db.authenticate()
  .then(() => console.log("database connected..."))
  .catch(err => console.log("error"));

//init app
const app = express();
require("./configs/passport")(passport);

//set up assets directory
app.use(express.static(path.join(__dirname, "resources")));
//body parser
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//set routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/User"));
app.use("/admin", require("./routes/Admin"));

//configure multer
const storage = multer.diskStorage({
  destination: "resources/uploads",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // const mimeType = filetypes.test(file.mimetype);

  if (/*mimeType &&*/ extname) {
    console.log("success");
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

app.get("/upload", (req, res) => {
  res.render("complainform", {
    title: "this is a complain",
    layout: "layouts/main.ejs"
  });
});

app.post("/upload", (req, res) => {
  let { title, location, description } = req.body;
  // let { myImage } = req.file;
  console.log(title);
  upload(req, res, err => {
    if (err) {
      res.render("complainform", {
        title: "error",
        msg: err,
        layout: "layouts/main.ejs"
      });
    } else {
      if (req.file == undefined) {
        res.render("complainform", {
          title: "error",
          msg: "Error: No File Selected!",
          layout: "layouts/main.ejs"
        });
      } else {
        res.redirect("complainform", {
          title: "uploading",
          msg: "File Uploaded!",
          file: `../uploads/${req.file.filename}`,
          layout: "layouts/main.ejs"
        });
      }
    }
  });
});

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is running on port ${port}`);
});
