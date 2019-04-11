const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Marker = require('../models/Marker');
const Coord = require('../models/Coord');