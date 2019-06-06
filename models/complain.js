const Sequelize = require('sequelize');

const sequelize = require('../utils/dbconnect');

const Compalin = sequelize.define('complain', {
    cId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    isComplete: Sequelize.BOOLEAN,
});

module.exports = Compalin;