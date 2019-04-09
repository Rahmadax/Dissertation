const Sequelize = require('sequelize');
const db = require('../../config/database');

const Event = db.define('event', {
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
    color: {
        type: Sequelize.STRING
    },
    date_start: {
        type: Sequelize.DATE
    },
    date_end: {
        type: Sequelize.DATE
    },
    starting_loc: {
        type: Sequelize.GEOMETRY('POINT')
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    mapId: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Event;