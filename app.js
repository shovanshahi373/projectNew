require("dotenv").config();
require("./configs/database");
const Sequelize = require("sequelize");
const express = require("express");
const path = require("path");
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const port = process.env.PORT || 3000;

//init app
const app = express();
const { userAuth } = require("./configs/passport");
// require("./configs/passport")(passport);
userAuth(passport);
const { adminAuth } = require("./configs/passport");
adminAuth(passport);

//set up assets directory
app.use(express.static(path.join(__dirname, "resources")));
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
  })
);
//init passport
app.use(passport.initialize());
app.use(passport.session());
//flash
app.use(flash());
//global flash variables
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

// app.get("*", (req, res) => {
//   res.status(404).sendFile(__dirname + "/resources/html/error.html");
// });

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/views/error.html");
});

// app.get("/upload", (req, res) => {
//   res.render("complainform", {
//     title: "this is a complain",
//     layout: "layouts/main.ejs"
//   });
// });

// app.post("/upload", (req, res) => {
//   let { title, location, description } = req.body;
//   // let { myImage } = req.file;
//   console.log(title);
//   upload(req, res, err => {
//     if (err) {
//       res.render("complainform", {
//         title: "error",
//         msg: err,
//         layout: "layouts/main.ejs"
//       });
//     } else {
//       if (req.file == undefined) {
//         res.render("complainform", {
//           title: "error",
//           msg: "Error: No File Selected!",
//           layout: "layouts/main.ejs"
//         });
//       } else {
//         res.redirect("complainform", {
//           title: "uploading",
//           msg: "File Uploaded!",
//           file: `../uploads/${req.file.filename}`,
//           layout: "layouts/main.ejs"
//         });
//       }
//     }
//   });
// });

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is running on port ${port}`);
});
