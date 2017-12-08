var inquirer = require("inquirer");
var words = require("./game");
var display = require("./letters");
var check = require("./words");

var currentWord;
var remainingGuesses = 10;
var wins = 0;
var losses = 0;
var showPlayer = [];
var checkLetter = [];
var wordsPlayed = [];

// Select a random word constructor function 
function selectRandomWord() {
    var x = Math.floor(Math.random() * 26)
    currentWord = words.possibleWords[x];
    // only allows us to play words that haven't been plpayed already
    if(wordsPlayed.includes(currentWord)) {
        selectRandomWord();
    } else {
        showPlayer = new display(currentWord);
        checkLetter = new check(currentWord);
    }
    wordsPlayed.push(currentWord);
}
// Restart the game
function restartGame() {
    inquirer.prompt([{
        name: "play",
        message: "Would you like to play again? (y or n)"
    }]).then(function(answer) {
        var confirm = answer.play.toLowerCase();
        if(confirm === "y") {
            remainingGuesses = 10;
            checkLetter.letterGuessed = [];
            currentWord = "";
            checkLetter.currentWordArray = [];

            selectRandomWord();            
            console.log("***");
            console.log("---------------------------------");
            console.log("HANGMAN!");
            console.log("---------------------------------");
            console.log("Welcome friends, to Hangman, Internet Relater Terminology and Nomenclature");
            console.log("Let\'s start the game...");            
            console.log("Guess this word:");
            showPlayer.originalDisplay();
            console.log("");
            console.log("Guesses Remaining: " + remainingGuesses);
            console.log("");
            guessLetters();
        }
        else if(confirm == "n") {
            console.log("It was a pleasure to serve!");
            console.log("***")
        } else {
        console.log("Please select \"y\"  or \"n\"");
        console.log("***");
        restartGame();
        }
    })    
};

// Start Game!
selectRandomWord();

// Original Display
console.log("***");
console.log("---------------------------------");
console.log("HANGMAN!");
console.log("---------------------------------");
console.log("Welcome friends, to Hangman, Internet Relater Terminology and Nomenclature");
console.log("Let\'s start the game...");
console.log("***");
console.log("Guess this word:");
showPlayer.originalDisplay();
console.log("");
console.log("Guesses Remaining: " + remainingGuesses);
console.log("");
// end original deisplay

// Prompt user to guess letter
var guessLetters = function() {
    if(remainingGuesses > 0) {
        inquirer.prompt([{
            name: "currentGuess",
            message: "Guess a letter"
        }]).then(function(answer) {
            var letter = answer.currentGuess.toLowerCase();
            var letters = /^[a-z]+$/;
            // if the letter is valid
            if(letter.match(letters)) {
                if(checkLetter.lettersGuessed.includes(letter)){
                    console.log('You have already guessed that letter');
                    showPlayer.updatedDisplay(letter);
                    console.log("Letters guessed: " + checkLetter.lettersGuessed);
                    console.log("Guesses remaining: " + remainingGuesses);
                    console.log("----------------------------------");
                    console.log("");
                    guessLetters();
                } else {
                    checkLetter.lettersGuessed.push(letter);
                    if(checkLetter.currentWordArray.includes(letter)) {
                        console.log("Correct!");
                        showPlayer.updatedDisplay(letter);
                        if(showPlayer.updated == currentWord) {
                            wins++;
                            console.log("You win!!");
                            console.log("***");
                            console.log("Number of wins: " + wins);
                            console.log("Number of losses: " + losses);
                            console.log("***")
                            restartGame();
                        } else {
                            console.log("Letters guessed: " + checkLetter.lettersGuessed);
                            console.log("Remaining guesses: " + remainingGuesses);
                            console.log("--------------------------");
                            console.log("***");
                            guessLetters();
                        }
                    } else {
                            console.log("Wrong answer");
                            showPlayer.updatedDisplay(letter);
                            console.log("Letters guessed: " + checkLetter.lettersGuessed);
                            remainingGuesses--;
                            console.log("Remaining ruesses: " + remainingGuesses);
                            console.log("--------------------------");
                            console.log("***");
                            guessLetters();
                        }
                    }
                }
            // if letter isn't valid
            else {
                console.log("Please select an alphabetic character, genius");
                console.log("***");
                guessLetters();
            }
        });
        }
        else {
            losses++;
            console.log("You lose");
            console.log("The term we were looking for was: " + currentWord);
            console.log("***");
            console.log("Number of wins: " + wins);
            console.log("Number of losses: " + losses);
            console.log("***");
            restartGame();
        }
}

console.log("Updated");

guessLetters();

