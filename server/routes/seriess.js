let Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const Series = require('../models/Series');
const Users = require('../models/User');
const User_Series = require('../models/_User_Series');
const Op = Sequelize.Op;

// Find all series a user has access to.
router.post('/get_all_seriess', (req, res) =>
    Users.findOne(
        {
            attributes: ['id', 'username'], where: {logged_in: req.body.unique}
        })
        .then( u => {
            User_Series.findAll({
                attributes: ['seriesId', 'read_write'],
                where: {userId: u['id']}
            })
                .then( seriesIds => {
                    let ids = [], rw = {};
                    for (let i = 0; i < seriesIds.length; i++) {
                        let this_series = seriesIds[i];
                        ids[i] = this_series['seriesId'];
                        rw[this_series['seriesId']] = seriesIds[i]['read_write'];
                    }
                    console.log(rw);
                    Series.findAll(
                        {
                            attributes: ['title', 'description', 'dateStart', 'dateEnd', 'unique'], where: {
                                [Op.or]: [
                                    {scope: 'admin'},
                                    {id: ids}
                                ]
                            }
                        })
                        .then(series => {
                            res.status(200).json([series, u['username']]);
                    })
                })
            .catch(err =>
                console.log(err)
            )
        .catch(err => {
            console.log(err);
        })
    }));

// Find all series a user has access to.
router.post('/get_test_series', (req, res) =>
    Series.findAll(
        {
            attributes: ['title', 'description', 'dateStart', 'dateEnd', 'unique'], where: {scope: 'admin'}
        })
        .then(series => {
            res.status(200).json(series);
    })
);

// Create a new user series.
router.post('/create', function(req, res) {
        Series.create({
            title: req.body.title,
            description: req.body.title,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd
        })
            .then(
                res.status(200)
            )
            .catch(err =>
                console.log(err))
    }
);

router.post('/get_series_info', (req, res) =>
    Series.findOne({raw:true, attributes: ['id'], where: {unique: req.body.unique}})
        .then(seriesID => {
            Series.findByPk(seriesID['id'],{ attributes: ['dateStart','dateEnd']})
                .then(series => {
                    res.status(200).json(series);
                })
                .catch(err =>
                    console.log(err)
                )
        })
        .catch(err =>
            console.log(err)
        )
);



module.exports = router;