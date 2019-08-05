const Sequelize = require("sequelize");
let db;

if (process.env.NODE_ENV == "production") {
  db = require("../remotedb");
} else {
  db = require("./database");
}

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
  createdBy: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mobile: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
