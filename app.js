const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database');

db.authenticate()
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));


const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Including body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// static CSS / JS requirements.
app.use("/styles", express.static("./styles"));
app.use("/scripts", express.static("./scripts"));

// Page Directory
app.get('/', (req, res) =>
    res.render(__dirname+"/views/pages/index.ejs"));
app.get('/profile', (req, res) =>
    res.render(__dirname+"/views/pages/profile.ejs"));
app.get('/about', (req, res) =>
    res.render(__dirname+"/views/pages/about.ejs"));



// Path Routes
app.use('/events', require('./routes/events'));
app.use('/users', require('./routes/users'));
app.use('/markers', require('./routes/markers'));
app.use('/maps', require('./routes/maps'));
app.use('/seriess', require('./routes/seriess'));


// Overhead info
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
