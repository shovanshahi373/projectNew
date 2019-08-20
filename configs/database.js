const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development";
// const config = require("../configs/config.json")[env];
// const dotenv = require("dotenv");
// require("../.env").config();
// dotenv.config();
if (process.env.NODE_ENV == "production") {
  const db = new Sequelize(REMOTE_DB, REMOTE_USR, REMOTE_PASS, {
    host: REMOTE_HOST,
    dialect: REMOTE_DIALECT,
    operatorAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true
    }
  });
  db.authenticate()
    .then(() => console.log("connected to remote db..."))
    .catch(err => console.log(err));
  module.exports = db;
} else {
  // require("../.env").config();
  const db = new Sequelize(
    process.env.LOCAL_DB,
    process.env.LOCAL_USR,
    process.env.LOCAL_PASS,
    {
      host: process.env.LOCAL_HOST,
      dialect: "mysql",
      operatorAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true
      }
    }
  );
  db.authenticate()
    .then(() => console.log("connected to local db..."))
    .catch(err => console.log(err));
  module.exports = db;
}
