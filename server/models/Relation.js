const Sequelize = require('sequelize');
const db = require('../../config/database');

const Relation = db.define('relation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID_1: {
        type: Sequelize.INTEGER
    },
    userID_2: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

module.exports = Relation;