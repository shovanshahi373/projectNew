const Sequelizee = require('sequelize');

const sequelize = require('../utils/dbconnect');

const ResourceComplain = sequelize.define('userComplain', {
    id: {
        type: Sequelizee.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});


module.exports = ResourceComplain;