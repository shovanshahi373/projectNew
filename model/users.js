const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("users", {
  uid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mobile: {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: "-"
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
