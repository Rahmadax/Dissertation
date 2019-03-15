const Sequelize = require('sequelize');
module.exports = new Sequelize('time', 'postgres', 'pw', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});