// link data from a file
var friends = require('../data/friends');
console.log(friends);

//export this function to server.js
module.exports = function(app) {

    // api get calls for api routes
    //when link is clicked it shows JSON data in friends
    app.get('/api/friends', function(req, res) {

        res.json(friends);
    });

};