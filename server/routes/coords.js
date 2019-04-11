let Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Coord = require('../models/Coord');
const Op = Sequelize.Op;
