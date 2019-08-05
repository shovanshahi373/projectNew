const Sequelize = require("sequelize");

module.exports = new Sequelize("cpVJB15QPr", "cpVJB15QPr", "LgzpbTew0b", {
  host: "37.59.55.185",
  dialect: "mysql",
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});
