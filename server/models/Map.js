const Sequelize = require('sequelize');
const db = require('../../config/database');

const Map = db.define('map', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    date_start: {
        type: Sequelize.STRING
    },
    date_end: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    color: {
        type: Sequelize.STRING
    },
    seriesId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Map;