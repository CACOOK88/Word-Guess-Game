// VARIABLES FOR PRINTING TO SCREEN
var word = document.getElementById("word");
var lives = document.getElementById("lives");
var guessed = document.getElementById("guessed");
var life = 15;
var guesses = [];
var blankAnswer = [];

// VARIABLES FOR WORD CHOICE AND ALPHABET VERIFICATION
var answers = ["mustang", "camaro", "corvette", "challenger", "charger"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// CHOOSING RANDOM FOR COMPUTER
var computerChoice = answers[Math.floor(Math.random() * answers.length)];

// FOR LOOP TO TAKE ARRAY OF LETTERS AND CONVERT THEM TO ARRAY OF DASHES IN PLACE OF EACH LETTER.
for ( let i = 0; i < computerChoice.length; i++) {
    blankAnswer.push("-");
}

// FUNCTION TO REMOVE COMMAS FROM THE ARRAY WHEN PRINTING TO SCREEN
var blankAnswerString = function() {
    var printThis = "";
    for(var i = 0; i < blankAnswer.length; i++) {
        printThis += blankAnswer[i];
    }
    return printThis;
}

// FUNCTION TO REMOVE COMMAS FROM GUESSES ARRAY AND PRINT TO SCREEN WITH SPACES
var guessesString = function() {
    var printThis = "";
    for(var i = 0; i < guesses.length; i++) {
        printThis += guesses[i] + " ";
    }
    return printThis;
}

// FUNCTION TO COMPARE USER GUESS TO EACH ELEMENT IN THE SPLIT ARRAY. REPLACE ELEMENT WITH LETTER IF CORRECT, LIVES -1 IF NOT
var check = function(userGuess) {
    for(var i = 0; i < computerChoice.length; i++) {
        if (userGuess === computerChoice[i]) {
            // display letter on blankAnswer
            blankAnswer[i] = userGuess;
        } else {
            // if no match, lives -1 
            life--;
        }
    }
}

// FUNCTION TO CHECK IF KEYPRESS IS A DUPLICATE
var validKey = function(userGuess) {
    if (!guesses.includes(userGuess)) {
        guesses.push(userGuess);
        guessesString();
    } else {
        alert(userGuess + " has already been guessed");
    }
}

// PLAYER PRESSES A KEY
document.onkeyup = function(event) {
    var userGuess = event.key

    // CHECK IF KEY HAS BEEN PRESSED BEFORE AND PUSH TO ARRAY OF GUESSES IF NOT
    validKey(userGuess);
    // CHECK IF KEY PRESS MATCHES A LETTER IN THE ANSWER
    check(userGuess);







    // PRINT NO-COMMA ARRAY TO SCREEN
    word.innerText = blankAnswerString();
    // LIVES
    lives.innerText = life;
    // guesses
    guessed.innerText = guessesString();

}



