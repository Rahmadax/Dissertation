const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Map = require('../models/Map');

router.get('/get_maps_between', (req, res) =>
    Map.findAll({where: {logged_in: req.body.d}})
        .then(maps => {
            res.status(200).json(maps);
        })
        .catch(err =>
            console.log(err)
        )
);

router.post('/get_maps_in_series', (req, res) =>
    Map.findAll({where: {seriesID: req.body.id}})
        .then(maps => {
            for (let i = 0; i < maps.length; i++){
                console.log(maps[i]['id']);
                console.log(maps[i]['date_start']);
                console.log(maps[i]['date_end']);
            }
            res.status(200).json(maps);
        })
        .catch(err =>
            console.log(err)
        )
);

// Create a new user account.
router.post('/create', function(req, res) {
        Map.create({
            title: req.body.title,
            date_start: req.body.date_start,
            date_end: req.body.date_end,
            color: req.body.color
        })
            .then(map => {
                res.status(200)
            })
            .catch(err =>
                console.log(err))
    }
);


module.exports = router;