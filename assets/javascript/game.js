// VARIABLES FOR PRINTING TO SCREEN
var word = document.getElementById("word");
var lives = document.getElementById("lives");
var guessed = document.getElementById("guessed");
var win = document.getElementById("win-text");
var lose = document.getElementById("lose-text");
var winCounter = document.getElementById("win-counter");
var lossesCounter = document.getElementById("losses-counter");
var life;
var wins = 0;
var losses = 0;
var guesses = [];
var blankAnswer = [];
var computerChoice;

// VARIABLES FOR WORD CHOICE AND ALPHABET VERIFICATION
var answers = ["mustang", "camaro", "corvette", "challenger", "charger"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// INITIATES NEW COMPUTER CHOICE AND PRINTS DASHES TO THE SCREEN.
function newComputerChoice() {
    computerChoice = answers[Math.floor(Math.random() * answers.length)];
    // FOR LOOP TO TAKE LETTERS AND CONVERT THEM TO ARRAY OF DASHES IN PLACE OF EACH LETTER.
    for ( let i = 0; i < computerChoice.length; i++) {
        blankAnswer.push(" _ ");
    }
    // SET LIFE COUNTER
    life = 5;
    // PRINT UPDATED EMPTY GUESSES TO SCREEN
    guessed.innerText = guessesString();
    // PRINT DASHES BEFORE FIRST KEYPRESS
    word.innerText = blankAnswerString();
    // PRINT LIVES BEFORE FIRST KEYPRESS
    lives.innerText = life;
}

// NEW GAME FUNCTION TO CALL WHEN WIN OR LOSE
function newGame() {
    setTimeout(function () {
        var element1 = document.getElementById(computerChoice); 
        element1.classList.add("hidden"); //HIDE CAR PIC
        var element2 = document.getElementById("lineup");
        element2.classList.remove("hidden"); //SHOW LINEUP PIC
        var element3 = document.getElementById("gameover");
        element3.classList.add("hidden"); //HIDE GAMEOVER PIC
        var element4 = document.getElementById("get-started");
        element4.innerText = "Let's Play Again!"
        blankAnswer = [];
        guesses = [];
        lose.innerText = "";
        win.innerText = "";
        newComputerChoice();
        // SHOW HINT BUTTON
        var element5 = document.getElementById("hint-button");
        element5.classList.remove("hidden");
        // REMOVE PREVIOUS HINT TEXT
        var element6 = document.getElementById("hint-text");
        element6.innerText = "";
    }, 5000);
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
        // HIDE DIRECTIONS
        var element = document.getElementById("get-started");
        element.innerText = "";
        if (!guesses.includes(userGuess.toUpperCase())) {
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
    if (!blankAnswer.includes(" _ ")) {
        // SHOW WIN TEXT AND INCREMENT WINCOUNTER
        win.innerText = "YOU WIN!!!";
        wins++;
        // REMOVE LINEUP PICTURE
        var element1 = document.getElementById("lineup");
        element1.classList.add("hidden");
        // SHOW PICTURE OF COMPUTERCHOICE
        var element2 = document.getElementById(computerChoice);
        element2.classList.remove("hidden");
        newGame();
    }
    if (life === 0) {
        // GAME OVER YOU LOSE TEXT AND DECREMENT LOSSCOUNTER
        lose.innerText = "YOU LOSE";
        losses++;
        // REMOVE LINEUP PICTURE
        var element1 = document.getElementById("lineup");
        element1.classList.add("hidden");
        // SHOW GAME OVER PICTURE
        var element2 = document.getElementById("gameover");
        element2.classList.remove("hidden");
        // SET WORD TO ANSWER
        blankAnswer = computerChoice.toUpperCase();
        newGame();
    }
    winCounter.innerText = wins;
    lossesCounter.innerText = losses;
}

// INITIATE FIRST GAME ON SCREEN LOAD
newComputerChoice();
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

// BUTTON CLICK EVENT LISTENER TO SHOW HINT
document.getElementById("hint-button").onclick = function() {
    // HIDE BUTTON WHEN CLICKED
    var element = document.getElementById("hint-button");
    element.classList.add("hidden");
    if (computerChoice === "camaro" || computerChoice === "corvette") {
        var element1 = document.getElementById("hint-text");
        element1.innerText = "Chevrolet makes this car";
    }
    if (computerChoice === "charger" || computerChoice === "challenger") {
        var element1 = document.getElementById("hint-text");
        element1.innerText = "Dodge makes this car";
    }
    if (computerChoice === "mustang") {
        var element1 = document.getElementById("hint-text");
        element1.innerText = "Ford makes this car";
    }
}

