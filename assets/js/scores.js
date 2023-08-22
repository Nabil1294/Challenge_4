// function to print scores in the last page
function printScores() {
    // getting scores from local storge 
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    // sorting the scores in descending order
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    // loop over the scores with creating li for each score to display it
    for (var i = 0; i < highscores.length; i += 1) {
        var liTag = document.createElement('li');
        // each listing contains initials with score
        liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
        // adding li to ol 
        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
}

// function to clear scores with clear button and reload empty page
function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}


document.getElementById('clear').onclick = clearHighscores;

printScores();