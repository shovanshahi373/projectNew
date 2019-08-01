const sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("admin", {
  eid: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fName: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$", "i"]
    }
  },
  lName: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$", "i"]
    }
  },
  contact: {
    type: sequelize.STRING,
    allowNull: false
  },
  citizenship: {
    type: sequelize.STRING,
    allowNull: false
  },

  userName: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  },
  img: {
    type: sequelize.STRING,
    allowNull: true,
    default: "image"
  }
});
