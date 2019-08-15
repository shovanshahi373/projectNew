const Sequelize = require("sequelize");
if (process.env.NODE_ENV == "production") {
  require("dotenv").parse();
  const db = new Sequelize(REMOTE_DB, REMOTE_USER, REMOTE_DB_PASS, {
    host: REMOTE_HOST,
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
  db.authenticate()
    .then(() => console.log("connected to remote db..."))
    .catch(err => console.log(err));
  module.exports = db;
} else {
  const db = new Sequelize("sarokaar", "root", "", {
    host: "localhost",
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
  db.authenticate()
    .then(() => console.log("connected to local db..."))
    .catch(err => console.log(err));
  module.exports = db;
}
