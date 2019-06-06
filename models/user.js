const Sequelize = require('sequelize');

const sequelize = require('../utils/dbconnect');

const User = sequelize.define('user', {
    userid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {min:1},

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
        type:Sequelize.STRING,
        allowNull: true,
              
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

module.exports = User;
