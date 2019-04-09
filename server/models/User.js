const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    hash: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    logged_in: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = User;