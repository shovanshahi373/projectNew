const Sequelize = require('sequelize');

const sequelize = require('../utils/dbconnect');

const DustLocation = sequelize.define('dustLocation', {
    locationId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true  
    },
    municipality: {
        type: Sequelize.STRING,
        allowNull : true,
    },
    wardNo: {
        type: Sequelize.STRING,
        allowNull: true,

    },
    tol: Sequelize.STRING,
    xCord: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    yCord: {
        type: Sequelize.STRING,
        allowNull: false,
        
    }

});

module.exports = DustLocation;