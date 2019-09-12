// dependcy
// must include path package so app can get the html file 
var path = require('path');

// command to export 
module.exports = function(app) {

    // defining html get requests for html page routes
    app.get('/survey', function(req, res) {

        // send this file. 
        // path.join inserts directory name & joins included path together as one string
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // defines html get request for html page routes
    // sets default route if no route matches are found
    app.get('*', function(req, res) {

        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};