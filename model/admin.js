const sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("admins", {
  id: {
    type: sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false
  },
  citizenship: {
    type: sequelize.STRING,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  },
  image: {
    type: sequelize.STRING,
    allowNull: true,
    default: "/images/img.png"
  }
});
