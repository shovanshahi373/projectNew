const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("complaints", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    validate: {
      min: 1
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z0-9]+$", "i"]
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$", "i"]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$"]
    }
  },
  mobile: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      is: ["^[0-9]{10}$"]
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
