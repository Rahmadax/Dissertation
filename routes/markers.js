const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Marker = require('../models/Marker');

router.get('/', (req, res) =>
    Marker.findAll()
        .then(markers => {
            res.status(200).json(markers);
        })
        .catch(err =>
            console.log(err))
);

module.exports = router;