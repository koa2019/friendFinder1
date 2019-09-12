// link data from a file
var friends = require('../data/friends');

//export this function to server.js
module.exports = function(app) {

    // api get calls for api routes
    //when link is clicked it shows JSON data in friends
    app.get('/api/friends', function(req, res) {

        res.json(friends);
    });

    //API POST Routes 
    // post captures data submitted from survey.html & is sending it to the server
    // user submiting data in form of JSON object
    app.post('/api/friends', function(req, res) {

        // req.body is JSON object submitted from survey.html 
        // req.body is available since we're using the body parsing middleware
        // pushes JSON obj into friends array inside of friends.js
        friends.push(req.body);
    });
};