const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Event = require('../models/Event');

router.post('/get_events', (req, res) =>
    Event.findAll({where: {map_id: req.body.id}})
        .then(events => {
            res.status(200).json(events);
        })
        .catch(err =>
            console.log(err))
);

module.exports = router;