const mysql = require("mysql");
const express = require("express");
const path = require("path");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
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
    title: "hello my world"
  });
});

//admin login route
app.get("/admin-login", (req, res) => {
  res.render("adminlogin", { title: "hi" });
});

app.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE mydb";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created...");
  });
});

app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE register(id int(100) AUTO_INCREMENT PRIMARY KEY, firstName varchar(225) NOT NULL, lastName varchar(225), email varchar(225) NOT NULL, password varchar(225) NOT NULL);";
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("table created successfully");
    }
  });
});

//insert a record
app.get("/setpost1", (req, res) => {
  let sql = "INSERT INTO register SET ?";
  let post = {
    firstName: "sovan",
    lastName: "shahi",
    email: "example@123.com",
    password: "pass123"
  };
  conn.query(sql, post, err => {
    if (err) {
      console.log(err);
    } else {
      res.send("record added successfully");
    }
  });
});

//fetch record
app.get("/fetch/:id", (req, res) => {
  let sql = `SELECT * FROM register where id = ${req.params.id};`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("record fetched...");
    }
  });
});

//update record
app.get("/update/:id", (req, res) => {
  let newName = "newName";
  let sql = `UPDATE register SET firstName = '${newName}' WHERE id = ${
    req.params.id
  };`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("record updated");
    }
  });
});

//delete record
app.get("/delete/:id", (req, res) => {
  let sql = `DELETE FROM register WHERE id = ${req.params.id};`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("record deleted...");
    }
  });
});

app.listen(3000, err => {
  if (err) console.log(err);
  console.log("server running on port 3000");
});
