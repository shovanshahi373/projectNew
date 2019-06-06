const Sequelize = require('sequelize');

const sequelize = require('../utils/dbconnect');

const Admin = sequelize.define('admin',{
    eid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    fName: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {is: ["^[a-z]+$",'i']},
    },
    lName: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {is: ["^[a-z]+$",'i']},
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: false,
    
    },
    citizenship: {
        type: Sequelize.STRING,
        allowNull: false
    },

    userName: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {isEmail: true},
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

});


module.exports = Admin;