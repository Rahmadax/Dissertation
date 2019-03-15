const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Series = require('../models/Series');

router.get('/get_all_seriess', (req, res) =>
    Series.findAll({where: {scope: 'admin'}})
        .then(series => {
            res.status(200).json(series);
        })
        .catch(err =>
            console.log(err)
        )
);

// Create a new user account.
router.post('/create', function(req, res) {
        Series.create({
            title: 'Test series 3',
            description: 'This is the main test series!!',
            dateStart: new Date("0001-01-01"),
            dateEnd: new Date("2500-01-01"),
        })
            .then(map => {
                res.status(200)
            })
            .catch(err =>
                console.log(err))
    }
);

router.post('/get_series_info', (req, res) =>
    Series.findByPk(req.body.id)
        .then(series => {
            res.status(200).json(series);
        })
        .catch(err =>
            console.log(err)
        )
);



module.exports = router;