const Sequelize = require("sequelize");
// const mysql = require("mysql");

module.exports = new Sequelize("sarokaar", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// module.exports = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "sarokaar"
// });
