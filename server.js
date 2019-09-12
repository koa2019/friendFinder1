// dependencies
var express = require('express');

// config express to create an instance of it
// creating an express server & saves it to variable for easier reference
var app = express();

// set PORT for app to use
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing from web browser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// imports html routing calls
require('./app/routing/htmlRoutes')(app);

// import api get routes
require('./app/routing/apiRoutes')(app);

// tell server to start listening for a requests & console PORT #
app.listen(PORT, function() {

    console.log("App connected to http://localhost:" + PORT);
});