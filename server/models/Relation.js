const Sequelize = require('sequelize');
const db = require('../../config/database');

const Relation = db.define('relation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username_1: {
        type: Sequelize.STRING
    },
    username_2: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

module.exports = Relation;