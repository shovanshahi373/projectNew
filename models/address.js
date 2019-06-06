const Sequelize = require('sequelize');

const sequelize = require('../utils/dbconnect');

const Address = sequelize.define('address', {
    addressid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    provisionNo : {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {min: 1, max: 7},
    },
    district: {
        type: Sequelize.STRING,
    },
    municipality: {
        type : Sequelize.STRING
    },
    tol: Sequelize.STRING,

});


module.exports = Address;