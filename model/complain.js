const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("complains", {
  cid: {
    type: Sequelize.STRING,
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
  expDate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdBy: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  markedBy: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dateCreated: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
