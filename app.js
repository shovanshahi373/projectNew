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
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;

const User = require("./model/users");
const Location = require("./model/location");
const Complain = require("./model/complain");
const Resource = require("./model/resource");
const ComplainResource = require("./model/ComplainResource");

Complain.belongsTo(Location,{constraints:true,onDelete:'CASCADE'});
Complain.belongsToMany(Resource,{through: 'ComplainResource'});
Complain.belongsTo(User,{constraints:true,onDelete:'CASCADE'});

require("./configs/database").sync({force: false});

//init app
const app = express();
const { userAuth } = require("./configs/passport");
// require("./configs/passport")(passport);
userAuth(passport);
const { adminAuth } = require("./configs/passport");
adminAuth(passport);

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
  })
);
//multer config
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'resources/uploads');
  },
  filename: (req, file, cb) =>{

    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif'){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
 
};


app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('myImage'))

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
  res.locals.user = req.user || null;
  // res.locals.admin = req.admin || null;
  next();
});

//set routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/User"));
app.use("/admin", require("./routes/Admin"));

//configure multer
// const storage = multer.diskStorage({
//   destination: "resources/uploads",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// // old multer
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter: function(req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).single("myImage");

// // Check File Type
// function checkFileType(file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   // const mimeType = filetypes.test(file.mimetype);

//   if (/*mimeType &&*/ extname) {
//     console.log("success");
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

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
