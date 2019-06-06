const Sequelize = require('sequelize');

const sequelize = require('../utils/dbconnect');

const Resource =sequelize.define('resource', {
    resourceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },
    rName: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    },
    rDescription:  {
        type: Sequelize.TEXT,
        allowNull: true
    },
    condition: {
        type: Sequelize.STRING,
        allowNull: true
    },

});

module.exports = Resource;