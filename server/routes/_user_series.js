const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const User = require('../models/User');
const Series = require('../models/Series');