const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');

// Is the user logged in?
router.get('/logged_in', (req, res) =>
    User.findById(3)
        .then(user => {
            if (user['logged_in'] == null)
                res.redirect('/');
        })
        .catch(err =>
            res.redirect('/'))
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
    // Generate a random 128 char extremely-low collision logged-in key.
    var unique = gen_unique();
    User.update({logged_in: unique}, {where: {id: 3}})
        .then((result) => {
            res.status(200).send(unique)
        })
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
                console.log(err))
    }
);

// Generate a semi-unique
function gen_unique(){
    var unique = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 120; i++)
        unique += possible.charAt(Math.floor(Math.random() * possible.length));
    return unique;
}

module.exports = router;
