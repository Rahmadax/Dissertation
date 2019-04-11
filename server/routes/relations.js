let Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Relation = require('../models/Relation');
const Op = Sequelize.Op;
const gs = require('../route_scripts/general_scripts.js');

// Log the user out.
router.post('/create', (req, res) => {
        (gs.get_user("username", req.body.username,['id'])).then( user1 =>{
            gs.get_user("username", req.body.username,['id']).then( user2 =>{
                user1 = user1['dataValues'];
                user2 = user2['dataValues'];
                let status;
                if (req.body.type === "friend")
                    status = "pending";
                else
                    status = "confirmed";

                Relation.create({userID_1: user1['id'], userID_2: user2['id'], type: req.body.type, status: status})
                    .then((result) => {
                        res.status(200).send()
                    })
                    .catch(err => (
                        res.status(201).send(err)
                    ))
        })
    }
)});

module.exports = router;