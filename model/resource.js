const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("resources", {
  resourceId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  rName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rDesc: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  condition: {
    type: Sequelize.STRING,
    allowNull: true
  }
});
