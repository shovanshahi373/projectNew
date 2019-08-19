const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("complains", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  markedBy: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});
