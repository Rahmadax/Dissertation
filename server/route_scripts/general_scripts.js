const User = require('../models/User');
const User_Series = require('../models/_User_Series');
const Series = require('../models/Series');
const Relations = require('../models/Relation');
const Coord = require('../models/Coord');

let Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Generalised server and query scripts here.
const gs = {
    // User Functions
    get_user: function (identifier, val, attributes) {
        if (identifier === "unique") {
            return Promise.resolve(User.findOne(
                {
                    where: {logged_in: val},
                    attributes: attributes,
                    returning: true,
                    plain: true
                }));
        } else if (identifier === "username") {
            return Promise.resolve(User.findOne(
                {
                    where: {username: val},
                    attributes: attributes,
                    returning: true,
                    plain: true
                }));
        } else if (identifier === "id") {
            return Promise.resolve(User.findOne(
                {
                    where: {id: val},
                    attributes: attributes,
                    returning: true,
                    plain: true
                }));
        }
    }, get_users_from_ids: function(ids, attributes){
        return Promise.resolve(User.findAll(
            {
                where: {id: ids},
                attributes: attributes
            }));
    },






    // Relations Functions
    get_relation: function(username_1, username_2){
        return Promise.resolve(Relations.findOne(
        { where: { [Op.or]: [
                {username_1: username_1, username_2: username_2},
                {username_2: username_1, username_1: username_2}
                ]}
            }
        ))
    },

    get_relations: function(username, attributes){
        return Promise.resolve(Relations.findAll(
            {
                where: {[Op.or]: [
                        {username_1: username},
                        {username_2: username}
                    ]},
                attributes: attributes
            }));
    },

    get_notifications: function(username, attributes){
        return Promise.resolve(Relations.findAll(
            {
                where: {username_2: username, type: "friends", status: "pending"},
                attributes: attributes
            }));
    },





    // Series Functions
    show_admin: function (unique){
        return Promise.resolve(Series.findOne(
            {
                where: {unique: unique},
                attributes: ['hideAdmin'],
                returning: true,
                plain: true
            }));
    },

    get_series_from_unique: function (unique, attributes){
        return Promise.resolve(Series.findOne(
            {
                where: {unique: unique},
                attributes: {attributes},
                returning: true,
                plain: true
            }));
    },


    upload_coord: function(point){
        return Promise.resolve(Coord.create({
            coord: point
        }))
    },




    // Linker Table Functions
    update_US_Linker: function (userId, seriesId, read_write){
        return Promise.resolve(User_Series.create({
            userId: userId,
            seriesId: seriesId,
            read_write: read_write
        }))
    },

    gen_unique: function(){
        let unique = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 126; i++)
            unique += possible.charAt(Math.floor(Math.random() * possible.length));
        return unique;
    },

};

module.exports = gs;