const Sequelize = require('sequelize');
const db = require('../../config/database');

const Coord = db.define('coord', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    coord: {
        type: Sequelize.GEOMETRY('POINT')
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Coord;