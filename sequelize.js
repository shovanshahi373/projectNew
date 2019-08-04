const Sequelize = require("sequelize");
const db = require("./database");
const AdminModel = require("./model/admin");

const Admin = new AdminModel(db, Sequelize);

module.exports = Admin;
