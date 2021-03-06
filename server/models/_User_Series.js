const Sequelize = require('sequelize');
const db = require('../../config/database');

const User_Series = db.define('user_series', {
    userId: {
        type: Sequelize.INTEGER
    },
    seriesId: {
        type: Sequelize.INTEGER
    },
    read_write: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = User_Series;