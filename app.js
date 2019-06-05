const mysql = require("mysql");
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sarokaar"
});

conn.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected...");
  }
});

//init app
const app = express();

app.use(express.static(path.join(__dirname, "resources")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcom to Sarokaar"
  });
});

//admin login route
app.get("/admin-login", (req, res) => {
  res.render("adminlogin", { title: "Admin Login" });
});

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
    developers: [
      {
        name: "Shovan Shahi",
        img: "/images/city.jpg",
        desc:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae magnam quae impedit maiores tempora quod eligendi eaque obcaecati deserunt quisquam! Non doloribus at obcaecati nulla officia placeat praesentium dicta veniam!"
      },
      {
        name: "Siddhartha Paudel",
        img: "images/city.jpg",
        desc:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur minus deserunt obcaecati dignissimos rerum voluptas sequi, hic perferendis at, provident sed repellat! Fuga qui culpa doloribus commodi numquam veritatis temporibus."
      },
      {
        name: "Ravi Sah",
        img: "../images/city.jpg",
        desc:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil adipisci sunt nam fuga iusto. Consequuntur harum odio distinctio minus libero delectus exercitationem, labore ad. Atque quas praesentium quasi cumque iste."
      },
      {
        name: "Sujit Sharma",
        img: "../images/city.jpg",
        desc:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil adipisci sunt nam fuga iusto. Consequuntur harum odio distinctio minus libero delectus exercitationem, labore ad. Atque quas praesentium quasi cumque iste.f"
      }
    ],
    title: "developers"
  });
});
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
