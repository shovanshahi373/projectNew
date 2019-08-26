const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("admins", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  citizenship: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
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
