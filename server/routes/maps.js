let Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Map = require('../models/Map');
const Event = require('../models/Event');
const Series = require('../models/Series');
const Op = Sequelize.Op;

router.get('/get_maps_between', (req, res) =>                                   //////////////////////// PROBLEM HERE
    Map.findAll({where: {logged_in: req.body.id}})
        .then(maps => {
            res.status(200).json(maps);
        })
        .catch(err =>
            console.log(err)
        )
);


router.post('/get_maps_in_series', (req, res) =>
    Series.findAll({raw:true, attributes: ['id'], where: {unique: req.body.unique}})
        .then(seriesID => {
            Map.findAll({ attributes: ['id', 'title', 'description', 'date_start', 'date_end', 'color'], where: {seriesId: seriesID[0]['id']}})
                .then(maps => {
                    let maps_output = [];
                    for (let i = 0; i < maps.length; i++){
                        maps_output.push([maps[i]['title'], maps[i]['description'], maps[i]['date_start'], maps[i]['date_end'], maps[i]['color']])
                    }
                    res.status(200).send(maps_output);
                })
                .catch(err =>
                    console.log(err)
                )
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



router.post('/get_events_handler', (req, res) =>
    Series.findAll({raw:true, attributes: ['id'], where: {unique: req.body.unique}})                            // Safe find of series ID
        .then(seriesID => {
            console.log('req.body.date');
            console.log("Series: " + seriesID[0]['id'], "Request date: " + req.body.date);
            Map.findAll({raw:true, attributes: ['id'], where: {                                                                     // Find all maps with found series ID FK
                    seriesId: seriesID[0]['id'],
                    [Op.and]: [
                        {date_start: {[Op.lte]: req.body.date}},
                        {date_end:   {[Op.gte]: req.body.date}}
                    ]}})
                .then(maps => {
                    console.log(maps);
                    let ids = [];
                    for (let i = 0; i < maps.length; i++)
                        ids.push(maps[i]['id']);
                    Event.findAll({where: {mapId: { [Op.in]:ids}}
                        })                                          // Find all events belonging to found maps. Search by map ID FK
                        .then(e => {
                            let events = [];
                            for (let j = 0; j < e.length; j++)
                                events.push([e[j]['title'], e[j]['description'], e[j]['date_start'], e[j]['date_end'], e[j]['color'], e[j]['starting_loc']]);
                            res.status(200).json(events);
                        })
                        .catch(err =>
                            console.log("event read")
                        );

                })
                .catch(err =>
                    console.log(err)
                )})
        .catch(err =>
            console.log(err)
        )
);



module.exports = router;