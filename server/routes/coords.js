let Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Coord = require('../models/Coord');
const Op = Sequelize.Op;
const gs = require('../route_scripts/general_scripts.js');

router.post('/upload_map_points', (req, res) => {
    let points = req.body.points;
    for (let i = 0; i < points.length; i++){
        let p = [points[i]['lat'],points[i]['lng']];
        console.log(p);
        gs.upload_coord(p)
    }
    });



module.exports = router;