const db = require("./database");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

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
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//home route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcom to Sarokaar"
  });
});

//admin login route
// app.get("/admin-login", (req, res) => {
//   res.render("adminlogin", {
//     title: "Admin Login"
//   });
// });

app.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE Sarokaar";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created...");
  });
});

app.get("/developers", (req, res) => {
  res.render("developers", {
    developers: [{
        name: "Shovan Shahi",
        img: "/images/shovan.jpg",
        desc: "Studying Bsc.CsIT, 7th semester at Tribhuvan University, Mr.Shovan Shahi is primarily interested in frontend development with HTML,CSS, JavaScript, Bootstrap as his tools. Currently shaping his skills on Node js, he has a dream of being a full stack developer.",
        link: "https://www.facebook.com/shovan.shahi" 
      },
      {
        name: "Siddhartha Paudel",
        img: "images/sid.jpg",
        desc: "Academically strong since his school, Mr.Siddharth Paudel is working as a developer and is polishing his skills on core JavaScript along with React and Node js. Having already worked as a Content Writer, Mr.Paudel is always up with innnovative ideas and has some insight on design aspects as well. ",
        link: "https://www.facebook.com/siddharth.poudel.5"
      },
      {
        name: "Ravi Sah",
        img: "../images/ravi.jpg",
        desc: "A teacher, project manager at a non-government organization and an aspiring developer, Mr.Ravi Shah has already proved himself a man of multiple talents. He seeks to become a web developer in future.",
        link: "https://www.facebook.com/ravishah5a"
      },
      {
        name: "Sujit Sharma",
        img: "../images/sujit.jpg",
        desc: "Also sutdying CSIT, Mr.Sujit Sharma has a strong background  on programming logics and is able to capture any new stuffs he lays hand on. A java programmer and a backend developer, he's already completed a few projects of his own along with his collegaues mentioned above.",
        link: "https://www.facebook.com/profile.php?id=100011510970747"
      }
    ],
    title: "developers"
  });
});

app.use('/admin', require('./routes/Admin'));
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