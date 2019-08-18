const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("users", {
 
  uname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true,
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
