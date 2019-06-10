const Sequelize = require('sequelize');
const db = require('../database');

const UserModel = db.define('userModel', {
    userid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
            min: 1
        }
    },
    fName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$", 'i']
        }
    },
    lName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$", 'i']
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: ["^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"]
        }
    },
    mobile: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            is: ["^[0-9]{10}$", 'i']
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = UserModel;