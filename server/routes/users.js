const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const User = require('../models/User');

// Is the user logged in?
router.post('/logged_in', (req, res) =>
    User.findOne( {where: {logged_in: req.body.unique}})
        .then(user => {
            if (user['id'] == null)
                res.send('false');
            else
                res.send('true');
        })
        .catch(err =>
            res.redirect('/404'))
);

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
                let unique = gen_unique();
                User.update({logged_in: unique}, {where: {id: user['id']}})
                    .then(
                    );
                res.status(200).send([unique, user['username']])
            } else {
                res.status(200).send('error');
            }

        });
    }
);

// Create a new user account.
router.post('/create', function(req, res) {
    User.create({
        username: req.body.username,
        hash: req.body.password,
        email: req.body.email,
        logged_in: gen_unique(),
        status: 'user'
    })
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err =>
        res.status(410)
    )
});

// Generate a semi-unique string
function gen_unique(){
    let unique = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 126; i++)
        unique += possible.charAt(Math.floor(Math.random() * possible.length));
    return unique;
}

module.exports = router;
