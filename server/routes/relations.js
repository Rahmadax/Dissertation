let Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Relation = require('../models/Relation');
const Op = Sequelize.Op;
const gs = require('../route_scripts/general_scripts.js');

// Log the user out.
router.post('/create_relation', (req, res) => {
    console.log('here');
        (gs.get_user("username", req.body.username_2,['username'])).then( that_user =>{
            if (that_user != null){
                gs.get_user("unique", req.body.unique,['username']).then( this_user =>{
                    that_user = that_user['dataValues'];
                    this_user = this_user['dataValues'];
                    gs.get_relation(that_user['username'], this_user['username']).then (rel => {
                        if (rel == null) {
                            let status;
                            if (req.body.type === "friend")
                                status = "pending";
                            else
                                status = "confirmed";
                            console.log(req.body.unique);
                            Relation.create({username_1: this_user['username'], username_2: that_user['username'], type: req.body.type, status: status})
                                .then(
                                    res.status(200).send("Request Sent.")
                                )
                                .catch(err => (
                                    res.status(201).send(err)
                                ))
                        } else {
                            if (rel['dataValues']['type'] === "block" && rel['username_2'] === this_user['username']){
                                Relation.create({username_1: this_user['username'], username_2: that_user['username'], type: "hidden_block", status: "confirmed"})
                                    .then(
                                        res.status(200).send("Request Sent.")
                                    )
                                    .catch(err => (
                                        res.status(201).send(err)
                                    ))
                            } else {
                                res.status(200).send("You're already connected.")
                            }
                        }
                    })
                })
            } else {
                res.status(200).send("User not found.")
            }
        })
    }
);

// Gets a relation from unique code.
router.post('/get_relations_from_unique', (req, res) => {
    (gs.get_user("unique", req.body.unique,['username'])).then( user =>{ // Get user from unique.
        let username = user['username'];
            gs.get_relations(username, ["username_1", "username_2", "type", "status",'createdAt']).then( relations => { // Get all their relations
                let friends = [];
                let blocked = [];
                for (let i = 0; i < relations.length; i++){
                    let r = relations[i];
                    if (r["username_1"] === username) {
                        if (r["type"] === "friends") {                                      // Sort into blocked and friends array
                            friends.push([r["username_2"], r["status"], r["createdAt"]]);
                        } else if (r["type"] === "hidden_block") {                          // Hides that a user is blocked. Appears as friend request.
                            friends.push(r['username_2'], "pending", r["createdAt"]);
                        } else {
                            blocked.push([r["username_2"], r["createdAt"]]);
                        }
                    } else {
                        if (r["type"] === "friends") {
                            friends.push([r["username_1"], r["status"], r["createdAt"]]);
                        }
                    }
                }
                res.status(200).send([friends, blocked])
            })
        }
    )});


router.post('/check_notifications', (req, res) => {
    (gs.get_user("unique", req.body.unique, ['username'])).then(user => { // Get user from unique.
        gs.get_notifications(user['username'], ["username_1", 'createdAt']).then(relations => { // Get all their relations
            if (relations != null) {
                let rel = [];
                for (let i = 0; i < relations.length; i++) {
                    let this_rel = relations[i];
                    let date = new Date(this_rel['createdAt']);
                    rel.push([this_rel['username_1'], date.getMonth(), date.getDay()])
                }
                res.status(200).send(rel);
            }
        })
    })
});

module.exports = router;