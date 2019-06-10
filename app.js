const db = require("./database");
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
// const userModel = require('./model/users');
const port = process.env.PORT || 3000;

const routes = require('./routes/index');
const users = require('./routes/User');
const admin = require('./routes/Admin');

//connect to database
db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected...");
  }
});

//init app
const app = express();

//middleware
app.use(express.static(path.join(__dirname, "resources")));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//set routes
app.use('/', routes);
// app.use('/users', users);
app.use('/admin', admin);

const storage = multer.diskStorage({
  destination: "resources/uploads",
  filename: function (req, file, cb) {
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
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = filetypes.test(file.mimetype);

  if (mimeType && extname) {
    console.log("success");
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

app.get("/upload", (req, res) => {
  res.render("complainform", {
    title: "this is a complain"
  });
});

app.post("/upload", (req, res) => {
  let {
    title,
    location,
    description
  } = req.body;
  // let { myImage } = req.file;
  console.log(title);
  upload(req, res, err => {
    if (err) {
      res.render("complainform", {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render("complainform", {
          msg: "Error: No File Selected!"
        });
      } else {
        res.render("complainform", {
          msg: "File Uploaded!",
          file: `../uploads/${req.file.filename}`
        });
      }
    }
  });
});

app.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE Sarokaar";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created...");
  });
});



// app.use("/admin", require("./routes/Admin"));
// app.use('/user', require('./routes/User'));

// const {
//   addUser,
//   editUser,
//   deleteUser,
//   updateUser
// } = require('./routes/User');

// app.get("/createpoststable", (req, res) => {
//   let sql =
//     "CREATE TABLE register(id int(100) AUTO_INCREMENT PRIMARY KEY, firstName varchar(225) NOT NULL, lastName varchar(225), email varchar(225) NOT NULL, password varchar(225) NOT NULL);";
//   conn.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("table created successfully");
//     }
//   });
// });

//insert a record
// app.get("/setpost1", (req, res) => {
//   let sql = "INSERT INTO register SET ?";
//   let post = {
//     firstName: "sovan",
//     lastName: "shahi",
//     email: "example@123.com",
//     password: "pass123"
//   };
//   conn.query(sql, post, err => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("record added successfully");
//     }
//   });
// });

//fetch record
// app.get("/fetch/:id", (req, res) => {
//   let sql = `SELECT * FROM register where id = ${req.params.id};`;
//   conn.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       res.send("record fetched...");
//     }
//   });
// });

//update record
// app.get("/update/:id", (req, res) => {
//   let newName = "newName";
//   let sql = `UPDATE register SET firstName = '${newName}' WHERE id = ${
//     req.params.id
//   };`;
//   conn.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       res.send("record updated");
//     }
//   });
// });

//delete record
// app.get("/delete/:id", (req, res) => {
//   let sql = `DELETE FROM register WHERE id = ${req.params.id};`;
//   conn.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       res.send("record deleted...");
//     }
//   });
// });

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server is running on port ${port}`);
});