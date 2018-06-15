//Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser"); 

//Set up the port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

//Instantiate the Express app
var app = express()
 
//Set up an Express Router
var router = express.Router();

//Require our routes file pass our router object
require("./config/routes")(router);

//Designate the public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect handlebars to express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Use bodyParser in the app
app.use(bodyParser.urlencoded({
    extended: false
}));

//Have every request go through the router middleware
app.use(router);

//If deployed, use the deployed database. Otherwise use the local mongoHeadLines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose to the database
mongoose.connect(db, function(error) {
    //logany errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    // or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

//Listen on the port
app.listen(PORT, function () {
  console.log("Listening on port" + PORT);
});
 


