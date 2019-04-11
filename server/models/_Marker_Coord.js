const Sequelize = require('sequelize');
const db = require('../../config/database');

const Marker_Coord = db.define('marker_coord', {
    markerId: {
        type: Sequelize.INTEGER
    },
    coordId: {
        type: Sequelize.GEOMETRY('POINT')
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Marker_Coord;