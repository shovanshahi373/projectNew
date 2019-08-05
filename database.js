const Sequelize = require("sequelize");
// const mysql = require("mysql");

const db = new Sequelize("sarokaar", "root", "", {
  host: "localhost",
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

module.exports = db;
