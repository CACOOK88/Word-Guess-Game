// VARIABLES FOR PRINTING TO SCREEN
var word = document.getElementById("word");
var lives = document.getElementById("lives");
var guessed = document.getElementById("guessed");
var win = document.getElementById("win-text");
var lose = document.getElementById("lose-text");
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
    blankAnswer.push("_ ");
}

// FUNCTION TO REMOVE COMMAS FROM THE ARRAY WHEN PRINTING TO SCREEN
function blankAnswerString() {
    var printThis = "";
    for(var i = 0; i < blankAnswer.length; i++) {
        printThis += blankAnswer[i];
    }
    return printThis;
}

// FUNCTION TO REMOVE COMMAS FROM GUESSES ARRAY AND PRINT TO SCREEN WITH SPACES
function guessesString() {
    var printThis = "";
    for(var i = 0; i < guesses.length; i++) {
        printThis += guesses[i] + " ";
    }
    return printThis;
}

// FUNCTION TO COMPARE USER GUESS TO EACH ELEMENT IN THE SPLIT ARRAY. REPLACE ELEMENT WITH LETTER IF CORRECT, LIVES -1 IF NOT
function check(userGuess) {
    for(var i = 0; i < computerChoice.length; i++) {
        if (userGuess === computerChoice[i]) {
            // display letter on blankAnswer
            blankAnswer[i] = userGuess.toUpperCase();
        } 
    }
    if (!computerChoice.includes(userGuess) && alphabet.includes(userGuess)) {
        life--;
    }
}

// FUNCTION TO CHECK IF KEYPRESS IS A DUPLICATE AND A LETTER
function validKey(userGuess) {
    if (alphabet.includes(userGuess)) {
        if (!guesses.includes(userGuess)) {
            guesses.push(userGuess.toUpperCase());
            guessesString();
        } else {
            alert(userGuess + " has already been guessed");
        }
    } else {
        alert("Not a letter");
    }
}

// CHECK SCORE FOR WIN AND LOSS
function checkScore() {
    if (!blankAnswer.includes("-")) {
        // SHOW WIN TEXT
        win.innerText = "YOU WIN!!!";
        // REMOVE LINEUP PICTURE
        var element1 = document.getElementById("lineup");
        element1.classList.add("hidden");
        // SHOW PICTURE OF COMPUTERCHOICE
        var element2 = document.getElementById(computerChoice);
        element2.classList.remove("hidden");
    }
    if (life === 0) {
        // GAME OVER YOU LOSE TEXT
        lose.innerText = "YOU LOSE";
        // REMOVE LINEUP PICTURE
        var element1 = document.getElementById("lineup");
        element1.classList.add("hidden");
        // SHOW GAME OVER PICTURE
        var element2 = document.getElementById("gameover");
        element2.classList.remove("hidden");
        
    }
}

// PRINT DASHES BEFORE FIRST KEYPRESS
word.innerText = blankAnswerString();
// PRINT LIVES BEFORE FIRST KEYPRESS
lives.innerText = life;

// PLAYER PRESSES A KEY
document.onkeyup = function(event) {
    var userGuess = event.key

    // CHECK IF KEY HAS BEEN PRESSED BEFORE AND PUSH TO ARRAY OF GUESSES IF NOT
    validKey(userGuess);

    // CHECK IF KEY PRESS MATCHES A LETTER IN THE ANSWER THEN PUSH GUESS TO ARRAY OF GUESSES
    check(userGuess);

    // CHECK SCORE FOR GAME OVER
    checkScore();

    // PRINT NO-COMMA ARRAY TO SCREEN
    word.innerText = blankAnswerString();
    // LIVES
    lives.innerText = life;
    // guesses
    guessed.innerText = guessesString();


}



