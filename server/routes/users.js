const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const User = require('../models/User');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;
const gs = require('../route_scripts/general_scripts.js');

// Is the user logged in?
router.post('/logged_in', (req, res) =>{
    let user = (gs.get_user("unique", req.body.unique, ["id"]));
    user.then( u =>{
        if (u == null)
            res.send('false');
        else
            res.send('true');
    });

});

// Log the user out.
router.post('/log_out', (req, res) =>
    User.update({logged_in: null}, {where: {logged_in: req.body.unique}})
        .then((result) => {
            res.status(200).send()
        })
);

// Log the user in.
router.post('/login', (req, res) => {
    User.findOne({raw:true, where: {username: req.body.username, hash: req.body.password}})
        .then(user => {
            if (user != null) {
                let unique = gs.gen_unique();
                User.update({logged_in: unique}, {where: {id: user['id']}})
                res.status(200).send([unique, user['username']])
            } else {
                res.status(200).send('error');
            }

        });
    }
);

// Create a new user account.
router.post('/create', function(req, res) {
    User.findOne({ where : {
        [Op.or]: [
                {username: req.body.username},
                {email: req.body.email}
        ]
    }})
    .then((user) => {
        if (user !== null){
            if (String(user['email']) === String(req.body.email)){
                    res.status(201).send(['This email already has an account', false]);
                } else if (user['username'] === req.body.username) {
                    res.status(201).send(['Username already exists', false]);
            }
        } else {
            console.log('here');
            let unique = gs.gen_unique();
            User.create({
                username: req.body.username,
                hash: req.body.password,
                email: req.body.email,
                status: "user",
                logged_in: unique,
                hide_admin: false
            })
                .then(
                    res.status(200).send([unique, true])
                )
                .catch(err =>
                    console.log(err))
        }
    })
    .catch(err =>
        res.status(410)
    )
});


// Log the user out.
router.post('/flip', (req, res) => {
    (gs.get_user("unique" ,req.body.unique,['id', 'hideAdmin'])).then( u =>{
        let user = u['dataValues'];
        User.update({hideAdmin: !user['hideAdmin']}, {where: {id: user['id']}})
            .then((result) => {
                res.status(200).send()
            })
            .catch(err => (
                res.status(201).send('Error')
            ))
        })
    }
);


module.exports = router;
