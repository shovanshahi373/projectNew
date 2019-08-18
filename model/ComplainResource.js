const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("complainResource", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
});
