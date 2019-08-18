const Sequelize = require("sequelize");
if (process.env.NODE_ENV == "production") {
  const db = new Sequelize(
    process.env.REMOTE_DB,
    process.env.REMOTE_USER,
    process.env.REMOTE_DB_PASS,
    {
      host: process.env.REMOTE_HOST,
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
    .then(() => console.log("connected to remote db..."))
    .catch(err => console.log(err));
  module.exports = db;
} else {
  const db = new Sequelize("sarokaar", "root", "Sujit@123#", {
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
      timestamps: true
    }
  });
  db.authenticate()
    .then(() => console.log("connected to local db..."))
    .catch(err => console.log(err));
  module.exports = db;
}
