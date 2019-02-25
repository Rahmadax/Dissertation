var express = require("express"),
  app = express(),
  http = require("http").Server(app).listen(80);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/styles", express.static("./styles"));
app.use("/scripts", express.static("./scripts"));
console.log("server started port 80");

app.get("/", function(req, res){
  res.render(__dirname+"/views/pages/index.ejs");
});

app.get("/profile", function(req, res){
  res.render(__dirname+"/views/pages/profile.ejs");
});

app.get("/new_account", function(req, res){
  res.render(__dirname+"/views/pages/new_account.ejs");
});

