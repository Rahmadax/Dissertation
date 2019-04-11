const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


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
app.get('/', function(req, res) {
    res.render(__dirname +"/views/pages/temp.ejs")
});

app.get('/index', function(req, res){
    res.render(__dirname +"/views/pages/index.ejs")
});

app.get('/logged_out_index', function(req, res){
    res.render(__dirname +"/views/pages/logged_out_index.ejs")
});

app.get('/profile', (req, res) =>
    res.render(__dirname+"/views/pages/profile.ejs"));

app.get('/about', (req, res) =>
    res.render(__dirname+"/views/pages/about.ejs"));

app.get('/404', function(req, res){
    res.render(__dirname+"/views/pages/404.ejs");
});

// Generic Imports
const sequelize = require('sequelize');

// Path Routes
app.use('/events', require('./server/routes/events'));
app.use('/users', require('./server/routes/users'));
app.use('/markers', require('./server/routes/markers'));
app.use('/maps', require('./server/routes/maps'));
app.use('/seriess', require('./server/routes/seriess'));
app.use('/relations', require('./server/routes/relations'));

// Model Imports
const User = require('./server/models/User');
const Event = require('./server/models/Event');
const Map = require('./server/models/Map');
const Series = require('./server/models/Series');
const Marker = require('./server/models/Marker');
const Relation = require('./server/models/Relation');

// Linker Model Imports
const _User_Series = require('./server/models/_User_Series');

// DB Relations
User.hasMany(_User_Series);
_User_Series.belongsTo(User);

Series.hasMany(_User_Series);
_User_Series.belongsTo(Series);

User.hasMany(Relation);
Relation.belongsTo(User);

Series.hasMany(Map);
Map.belongsTo(Series);

Map.hasMany(Event);
Event.belongsTo(Map);

Event.hasMany(Marker);
Marker.belongsTo(Event);





// Overhead info
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
