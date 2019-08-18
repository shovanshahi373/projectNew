const Sequelize = require("sequelize");
const db = require("../configs/database");

module.exports = db.define("location", {
  locationId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  locationName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  xCord: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yCord: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
