const Sequelize = require('sequelize');

const sequelize = new Sequelize('sarokar',
'root' ,'Sujit@123#',
{
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
