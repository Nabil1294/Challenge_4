// variables to track quiz 
var currentQuestionIndex = 0;
var timerId;
// variables to select all required DOM elements
var timerEl = document.getElementById('time');
var homeStartEl = document.getElementById('home-start');
var startBtn = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var titlesEl = document.getElementById('question-title');
var choicesEl = document.getElementById('choices');
var doneScreenEl = document.getElementById('all-done');
var finalScore = document.getElementById('final');
var initialsEl = document.getElementById('initials');
var submitBtn = document.getElementById('submit');
var reportEl = document.getElementById('report');
var scoresEl = document.getElementById('scores');
// function to start the quiz 
// function to hide the home page and switch to questions
// hidding high scores button till quiz is done
function startQuiz() {
    homeStartEl.setAttribute('class', 'homeEl');
    questionsEl.setAttribute('class', 'questionsEl');
    scoresEl.setAttribute('class', 'hide');
    timerId = setInterval(timecount, 1000);
    timecount();
    runQuestion();
}
// function to start getting questions from their array by their index
function runQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    titlesEl.textContent = currentQuestion.title;
    // clear previous choices content
    choicesEl.innerHTML = '';
    // loop for generating choices based on question index
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceBtn = document.createElement('button');
        choicesEl.appendChild(choiceBtn);
        choiceBtn.textContent = i + 1 + '. ' + choice;
        choiceBtn.setAttribute('class', 'choiceBtn');
        choiceBtn.setAttribute('value', choice);
        // adding choices to buttons for enabling click on it
        choiceBtn.addEventListener('click', function(event) {
            var clickedChoice = event.target.getAttribute('value');
            // condition to check if choice clicked is equal to question answer
            if (clickedChoice === currentQuestion.answer) {
                reportEl.textContent = 'CORRECT!';
                //setting time of half a sec to show (correct)
                setTimeout(function(){
                    reportEl.innerHTML='';
                }, 500);
                // if clicked choice doesn't match answer
            } else {
                reportEl.textContent = 'WRONG!';
                //setting time of half a sec to show (wrong)
                setTimeout(function(){
                    reportEl.innerHTML='';
                }, 500);
                //reportEl.textContent = 'WRONG!';
                // current time penalty -15 sec
                time -= 15;
                if (time < 0) {
                    time = 0;
                }
                // update timer
                timerEl.textContent = time;
            }
            // move to next question
                currentQuestionIndex++;
                //check if time is over or questions are finished
                if (time <= 0 || currentQuestionIndex === questions.length) {
                    //set timeout to move on to next page after 0.5 second
                    setTimeout(endQuiz, 500);
                } else {
                    runQuestion();
                }
        });
    }
}
// function endQuiz(); and 
function endQuiz() {
    //hide questions page
    questionsEl.setAttribute('class', 'hide');
    // show done screen
    doneScreenEl.removeAttribute('class');
    doneScreenEl.setAttribute('class', 'show');
    // show high scores button again
    scoresEl.removeAttribute('class');
    scoresEl.setAttribute('class', 'scores');
    // stop timer and set it back to 0
    clearInterval(timerId);
    timerEl.textContent = '0';
    //final score is = time remaining
    finalScore.textContent = time;
}
// setting variable for time length
var time = questions.length * 15;
// function to decrease time by 1 sec and end quiz if time is out (=0)
function timecount() {
    timerEl.textContent = time;
    time--;
    if (time <= 0) {
        clearInterval(timerId);
        endQuiz();
    }
}
// function to save scores
function saveHighscore() {
    //get value of initials input 
    var initials = initialsEl.value;
    // check if initials input is empty
    if (initials !== '') {
        // getting scores from local storage or if it's empty array
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
        // creating new user score object to store it with score = new time and initials = new initilas input
        var newUser = {
            score: time,
            initials: initials,
        };
        // adding new user score to high scores 
        highscores.push(newUser);
        // converting new object to string to be stored in local storage
        window.localStorage.setItem('highscores', JSON.stringify(highscores));
        // moving to last page which is the other html file
        window.location.href = 'highscores.html';
    }
}
// buttons to execute functions when clicked
submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;



































































































































































