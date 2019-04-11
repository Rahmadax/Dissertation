const Sequelize = require('sequelize');
const db = require('../../config/database');

const Series = db.define('series', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    dateStart: {
        type: Sequelize.DATE
    },
    dateEnd: {
        type: Sequelize.DATE
    },
    unique: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Series;