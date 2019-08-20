const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../configs/config.json")[env];
const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.authenticate()
  .then(() => console.log("connected to db..."))
  .catch(err => console.log(err));
module.exports = db;

// if (process.env.NODE_ENV == "production") {
//   const db = new Sequelize(
//     process.env.REMOTE_DB,
//     process.env.REMOTE_USER,
//     process.env.REMOTE_DB_PASS,
//     {
//       host: process.env.REMOTE_HOST,
//       dialect: "mysql",
//       operatorAliases: false,
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       },
//       define: {
//         timestamps: false
//       }
//     }
//   );
//   db.authenticate()
//     .then(() => console.log("connected to remote db..."))
//     .catch(err => console.log(err));
//   module.exports = db;
// } else {
//   const db = new Sequelize("sarokaar", "root", "", {
//     host: "localhost",
//     dialect: "mysql",
//     operatorAliases: false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     },
//     define: {
//       timestamps: true
//     }
//   });
//   db.authenticate()
//     .then(() => console.log("connected to local db..."))
//     .catch(err => console.log(err));
//   module.exports = db;
// }
// =======
// if (process.env.NODE_ENV == "production") {
//   const db = new Sequelize(
//     process.env.REMOTE_DB,
//     process.env.REMOTE_USER,
//     process.env.REMOTE_DB_PASS,
//     {
//       host: process.env.REMOTE_HOST,
//       dialect: "mysql",
//       operatorAliases: false,
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       },
//       define: {
//         timestamps: true
//       }
//     }
//   );
//   db.authenticate()
//     .then(() => console.log("connected to remote db..."))
//     .catch(err => console.log(err));
//   module.exports = db;
// } else {
//   const db = new Sequelize("sarokaar", "root", "Sujit@123#", {
//     host: "localhost",
//     dialect: "mysql",
//     operatorAliases: false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     },
//     define: {
//       timestamps: true
//     }
//   });
//   db.authenticate()
//     .then(() => console.log("connected to local db..."))
//     .catch(err => console.log(err));
//   module.exports = db;
// }
// >>>>>>> 0716abaa9b598359a3acdacf52243ab3a0f802d7