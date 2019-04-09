let Sequelize = require('sequelize');

const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Relation = require('../models/Relation');
const Op = Sequelize.Op;

// Create a new user account.
router.post('/create', function(req, res) {
        Relation.create({
            userID_1: req.body.userID_1,
            userID_2: req.body.userID_2,
            type: req.body.type,
            status: req.body.status,
        })
            .then(map => {
                res.status(200)
            })
            .catch(err =>
                console.log(err))
    }
);


module.exports = router;