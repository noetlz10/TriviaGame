//Global Variables

//Counter
var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var askCount = 1;
//======================
var timer = "";
var quesAsked = {
    1: {
        question: 'In which game did Mario first appear?',
        answers: ['The Legend of Zelda', 'Donkey Kong', 'Mario Paint', 'Super Mario Brothers'],
        correct: 'Donkey Kong',
        right: 'Correct!',
        wrong: 'Wrong!',
        imageUrl: 'assets/images/donkeyKong.gif'
    },
    2: {
        question: 'One of Marios most successful spin-off series was a racing game for the Super NES. What Game was this?',
        answers: ['Mario Racing', 'Mario Bumper Karts', 'Mario Brother Racing', 'Mario Kart'],
        correct: 'Mario Kart',
        right: 'Correct!',
        wrong: 'Wrong!',
        imageUrl: 'assets/images/mario-kart.gif'
    },
    3: {
        question: 'In Super Mario World, he made friends with a certain dinosaur. His name was?',
        answers: ['Reptar', 'Yoshi', 'Birdo', 'Koopa'],
        correct: 'Yoshi',
        right: 'Correct!',
        wrong: 'Wrong!',
        imageUrl: 'assets/images/yoshi-nes.gif'
    }

};
/*Functions
==============================================================*/
function start() {
    //When Start buttons is clicked clear trivSection
    $('.startBtn').on('click', function() {
        //Emptys trivia section
        $('.trivSection').empty();
        createQuestions();
    });
}
//Show the question after start button is clicked.
function createQuestions() {
    timerStart();
    //Get question
    var question = quesAsked[askCount]['question'];
    //assign div element to newDiv
    var newDiv = $('<div>');
    //Add a class to newDIv
    newDiv.addClass('question'); //<--so i can style it in my CSS
    //Add text to question
    newDiv.text(question);
    //Add question to DOM
    $('.trivSection').append(newDiv);
    createAnswers(); //<--your function that loops through your questions
}

function createAnswers() {
    var answerLength = quesAsked[askCount]['answers'].length;
   
    for (var i = 0; i < answerLength; i++) {
        //get answers
        var answers = quesAsked[askCount]['answers'][i];
        //Create new div to hold answers
        var newBtn = $('<button>');
        //Add class to new Div
        newBtn.addClass('answers redBtn');
        //Give buttons attribute
        newBtn.attr('data-type', answers);
        //add text to new Div
        newBtn.text(answers);
        //Add answers to DOM
        $('.trivSection').append(newBtn);
    }
    //Prevents click event from being saved
    $(document).off('click', '.answers', checkAnswer);
    $(document).on('click', '.answers', checkAnswer);
}

function checkAnswer() {
    //Get users answer choice
    var userAnswer = $(this).data('type');
    var correctAnswer = quesAsked[askCount]['correct'];
    var correctImg = quesAsked[askCount]['imageUrl'];

    var right = quesAsked[askCount]['right'];
    var wrong = quesAsked[askCount]['wrong'];
    console.log(askCount);
    
    if (userAnswer === correctAnswer) {
        //Update rightCount
        rightCount++;
        //Clears out triv Section
        $('.trivSection').empty();
        var newImg = $('<img>');
        newImg.attr('src', correctImg);
        $('.trivSection').append(newImg);
        //Create Div
        var newDiv = $('<div>');
        //Give div class
        newDiv.addClass('rightAnswer');
        //adds CORRECT! text to div
        newDiv.text(right);
        //Add answer to DOM
        $('.trivSection').append(newDiv);
        //Stops Time
        clearInterval(timer)
            //Add 1 to question count to move to the next question
        askCount++;
       
        if (askCount <= 3) {
            //removes CORRECT! text and continues to create next question after 5 seconds
            setTimeout(
                function() {
                    $('.trivSection').empty();
                    createQuestions();
                }, 5500);
        } 

        else {
            $('.trivSection').empty();
            var newImg = $('<img>');
            newImg.attr('src', correctImg);
            $('.trivSection').append(newImg);
            //Create Div
            var newDiv = $('<div>');
            //Give div class
            newDiv.addClass('rightAnswer');
            //adds CORRECT! text to div
            newDiv.text(right);
            //Add answer to DOM
            $('.trivSection').append(newDiv);
            //Stops Time
            clearInterval(timer)
                //Reset
            setTimeout(gameOver, 5500);
        }
    } 

    else {
        wrongCount++;
        //Clears out triv Section
        $('.trivSection').empty();
        var newImg = $('<img>');
        newImg.attr('src', correctImg);
        $('.trivSection').append(newImg);
        var newDiv = $('<div>');
        //Give div class
        newDiv.addClass('wrongAnswer');
        //adds Wrong! text to div
        newDiv.text(wrong);
        //Add answer to DOM
        $('.trivSection').append(newDiv);
        //Stops Time
        clearInterval(timer)
            //Add 1 to question count to move to the next question
        askCount++;

        if (askCount <= 3) {
            setTimeout(function() {
                $('.trivSection').empty();
                createQuestions();
            }, 5500);
        } 

        else {
            //Clears out triv Section
            $('.trivSection').empty();
            var newImg = $('<img>');
            newImg.attr('src', correctImg);
            $('.trivSection').append(newImg);
            var newDiv = $('<div>');
            //Give div class
            newDiv.addClass('wrongAnswer');
            //adds Wrong! text to div
            newDiv.text(wrong);
            //Add answer to DOM
            $('.trivSection').append(newDiv);
            //Stops Time
            clearInterval(timer);
            //Reset
            setTimeout(gameOver, 5500);
        }
    }
}
//Timer
//==========================================
function timerStart() {
    $('.timerSection').empty();
    //Sets time to 10
    trivTime = 100;
    //Progress Bar
    var timeTag = $('<div>');
    timeTag.addClass('time');
    timeTag.addClass('progress');
    var progressBar = $('<div>');
    progressBar.addClass('progress-bar progress-bar-danger');
    progressBar.width(trivTime + '%');

    $('.timerSection').append(timeTag);
    $('.time').append(progressBar);
    //Decrements Time
    timer = setInterval(timeDecrement, 100);
}

function timeDecrement() {
    //Progress bar decrement
    $('.progress-bar').width(trivTime + '%');
    trivTime--;
    //if time gets to 0
    if (trivTime === -10) {
        userAnswer = false;
        //Clears Time
        clearInterval(timer);
        checkAnswer();
    }

}

function gameOver() {
    //Remove everything in trivia section
    $('.trivSection').empty();
    //Remove everthing in timer section
    $('.timerSection').empty();
    var scoreDiv = $('<div>');
    scoreDiv.addClass('score');
    scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
    $('.trivSection').append(scoreDiv);
    //Assign new div element to new Div
    var newDiv = $('<div>');
    //add class to new Div
    newDiv.addClass('gameOver');
    //add game over text
    newDiv.text('Game Over! Play Again ?');
    //Append game over text to DOM
    $('.trivSection').append(newDiv);
    //Create ResetButton
    var newBtn = $('<button>');
    //Give btn Class
    newBtn.addClass('redBtn resetBtn');
    //Give btn reset Text
    newBtn.text('Reset');
    //Append
    $('.trivSection').append(newBtn);
    //Reset all value
    trivTime = 100;
    askCount = 1;
    rightCount = 0;
    wrongCount = 0;
    //When reset button is clicked.......
    $('.resetBtn').on('click', function() {
        $('.trivSection').empty()
            //Starts game over
        createQuestions();
    });
}



/*Main
==============================================================*/
start();
