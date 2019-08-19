const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("users", {
 
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  uname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  resetToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetTokenExpiry: {
    type: Sequelize.DATE,
    allowNull: true
  }
});
