const User = require('../models/User');
const User_Series = require('../models/_User_Series');
const Series = require('../models/Series');

const gs = {
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
    },

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
    }
};

module.exports = gs;