var html = "<h2>The word: <span id='word-in-play' style='letter-spacing: 20px'></span></h2>" + "<h2>Guessed letters: <span id='guessed-letters' style='letter-spacing: 20px'></span></h2>";

var gameStarted = false;
var wordInPlay;
var guessedLettersInPlay;
var hintInPlay;
var playerLivesInPlay;
var playerScoreInPlay;
var playerLossesInPlay
//var lastGuess;
//Insert words for the hangman game here. Ensure lower case.
var wordList = ["stalfos", "twinrova", "epona", "ganondorf", "link", "goron"];
var hintList = ["a skeletal foe", "twin witches, fire and ice", "trusty steed", "an ancient evil in human form", "bearer of courage", "rock-eaters"];
//Pick a random word from the list.
var word;
var hint;
//Strings are immutable, you'd have to use a replace function each time you wanted to update beyond appending.
var placeholderWord = [];
var guessedLetters = [];
var playerLives = 9;
var playerScore = 0;
var playerLosses = 0;
var gameOver = true;

function resetGame() {
    gameOver = false;
    document.querySelector("#game").innerHTML = html;
    wordInPlay = document.getElementById("word-in-play");
    guessedLettersInPlay = document.getElementById("guessed-letters");
    hintInPlay = document.getElementById("hint");
    playerLivesInPlay = document.getElementById("player-lives");
    playerScoreInPlay = document.getElementById("player-wins");
    playerLossesInPlay = document.getElementById("player-losses");
    //lastGuess = document.getElementById("last-guess");
    guessedLetters = [];
    placeholderWord = [];
    playerLives = 8;
    playerScoreInPlay.textContent = playerScore;
    hintInPlay.classList.remove('animated');
    word = wordList[Math.floor(Math.random() * wordList.length)];
    hint = hintList[wordList.indexOf(word)];
    for (var i = 0; i < word.length; i++) {
        placeholderWord.push("_");
    }
    wordInPlay.textContent = placeholderWord.join('');
    guessedLettersInPlay.textContent = guessedLetters.join('');
    hintInPlay.textContent = "Unlocked with 4 guesses left";
    playerLivesInPlay.textContent = playerLives;
}


function updatePlaceholderWord(guess) {
    //initial setup
    if (gameOver) {
        resetGame();
        return;
    }

    guess = guess.toLowerCase();
    //lastGuess.textContent = guess;

    //Validate input
    if (!guess.match(/[a-z]/i) || guess.length !== 1) {
        alert("Letters only.");
        return;
    }

    //Check to see if that letter has already been used
    for (var i = 0; i < guessedLetters.length; i++) {
        if (guess === guessedLetters[i]) {
            alert("You already tried " + guess);
            return;
        }
    }


    guessedLetters.push(guess); //If you change this to += then guessedLetters acts purely as a String.
    guessedLettersInPlay.textContent = guessedLetters.join('');
    //Update the word in play.
    var matchFound = false;
    for (var i = 0; i < word.length; i++) {
        if (guess === word[i]) {
            placeholderWord[i] = word[i];
            //.join() can be used to return an array as a string with the specified delimeters.
            wordInPlay.textContent = placeholderWord.join('');
            matchFound = true;
        }
    }

    if (matchFound === false) {
        playerLives--;
        playerLivesInPlay.textContent = playerLives;
    }

    if (placeholderWord.join("") === word) {
        var audio = new Audio('assets/sounds/BOTW_Get_SpiritOrb.wav');
        audio.play();
        playerScore++;
        playerScoreInPlay.textContent = playerScore;
        gameOver = true;
    }

    if (playerLives <= 0) {
        //you lose!
        var audio = new Audio('assets/sounds/LTTP_Error.wav');
        audio.play();
        playerLosses++;
        playerLossesInPlay.textContent = playerLosses;
        wordInPlay.textContent = word;
        gameOver = true;
    }

    if (playerLives === 4) {
        hintInPlay.textContent = hint;
        hintInPlay.classList.add('animated');
    }
}


document.onkeyup = function(event) {
    updatePlaceholderWord(event.key.toLowerCase());
}
