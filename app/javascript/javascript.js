$(document).ready(function() {

    // var arr = require("../../app/data/questions.js")
    // console.log(arr)

    // var questions = require("../../app/data/questions.js")
    // console.log(questions)

    var questions = [
        'Would you consider yourself a morning person?',
        'Do you prefer the beach over the mountains?',
        'Dogs are better than cats',
        'Dinner & a movie is better than going to a night club',
        'Sunsets are better than sunrises',
        'Money can buy you happiness',
        'Intimacy is the same as sex',
        'Parents should be able to spank their kids',
        'Family is important to me',
        'UFOs are real'
    ];

    renderToPage();

    $('.submit').on('click', function(event) {

        // stop html from doing its default function
        event.preventDefault();

        // capture each option value from <select> tag & push into a new array
        var qq = [];

        $('.chosen').map(function(index, elem) {
            var q = $(this).val();
            qq.push(q);
        });

        console.log(qq);

        // create JSON object from req.body
        var newFriend = {

            name: $('#surveyName').val().trim(),
            photo: $('#surveyPhoto').val().trim(),
            scores: qq
        };

        // send user input to server & server sends response in callback function
        $.post('/api/friends', newFriend, function(err, data) {

            if (err) {
                data.send('Error');
            };
            // if (data) {
            //     console.log(data);
            //     alert('Best Match ');
            // };
            // Grab the result from the AJAX post so that the best match's name and photo are displayed.
            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo);

            // Show the modal with the best match
            $("#results-modal").modal("toggle");
        });

        //call function
        getDataFromServer(newFriend);

    });

    function getDataFromServer(newFriend) {

        //ajax call to api to compare newFriend to each index in friends array & finds best match.
        $.ajax({
                url: '/api/friends',
                method: 'GET'
            })
            .then(function(friendsArr) {

                console.log(friendsArr);

                //call function
                loveMatch(newFriend, friendsArr);

                // })
                // .catch(function(err) {

                //     if (err) {
                //         console.log(err);
                //     };
            });
    }

    function getQuestions() {

        for (var x = 0; x < questions.length; x++) {

            question = questions[x];
            console.log(question);
            question = $('<h5>').text(question);
            $('.here').append(question);
            // return question;
        };
    }

    function renderToPage() {

        getSelectList();
        // getQuestions();
    }

    function getSelectList() {

        // Then display the fields in the HTML (Section Name, Date, URL)
        for (var i = 1; i <= 10; i++) {

            var newDiv = $('<div>');

            var label = $('<label>').addClass('here').attr('for', 'q' + i).text('Question ' + i);
            var selectList = $('<select class="custom-select chosen form-control" >').attr('id', 'q' + i);

            selectList.append(
                $('<option selected>').attr('value', '').text('Choose...'),
                $('<option>').attr('value', 1).text('1 (Strongly Disagree)'),
                $('<option>').attr('value', 2).text('2'),
                $('<option>').attr('value', 3).text('3'),
                $('<option>').attr('value', 4).text('4'),
                $('<option>').attr('value', 5).text('5(Strongly Agree)'),
            );
            var question = questions[i - 1];
            console.log(question);
            question = $('<h5>').text(question);
            label.append(question);
            // getQuestions();

            newDiv.append(label).append(selectList);
            $('.insertQQs').append(newDiv);
        };
    }


    function loveMatch(user, friends) {

        //userScores represents the person who just submitted the survey
        var userScores = user.scores;
        // var last = friends.length - 1;
        // var user = friends[last];
        // console.log("User's Scores  " + userScores)
        var bestMatch = 1000;

        //loop through each friend score & compare it to user's scores to find best match
        for (var i = 0; i < friends.length - 1; i++) {

            var scores = friends[i].scores;
            // console.log('Friend' + i + ' Scores ' + scores);

            var totalDiff = 0;

            // scores has 10 values. Loop through each scores index & find absoulte value of the difference from user's individual index scores
            // find the cimculative sum of the 2 people's 
            for (var x = 0; x < 10; x++) {

                var temp = Math.abs(scores[x] - userScores[x]);
                // console.log(temp);
                totalDiff += temp;
                // console.log('Total diff ' + totalDiff);
            };

            console.log('Total diff ' + totalDiff);

            if (totalDiff < bestMatch) {
                var temp2 = totalDiff;
                bestMatch = temp2;
                console.log('Best Match ' + bestMatch);
            };
            console.log('congrats best match ' + bestMatch);
        };
    }
});