// **********************************************************************
// 
//            VARIABLES 
// 
// **********************************************************************


// VARIABLES FOR GRABBING HTML ELEMENTS
var word = document.getElementById("word");
var lives = document.getElementById("lives");
var guessed = document.getElementById("guessed");
var win = document.getElementById("win-text");
var lose = document.getElementById("lose-text");
var winCounter = document.getElementById("win-counter");
var lossesCounter = document.getElementById("losses-counter");
var hintText = document.getElementById("hint-text");
var hintButton = document.getElementById("hint-button");
var computerChoicePic = document.getElementById(computerChoice);
var lineupPic = document.getElementById("lineup");
var gameOverPic = document.getElementById("gameover");
var getStartedText = document.getElementById("get-started");
// VARIABLES TO KEEP TRACK OF GAME SCORE
var life;
var wins = 0;
var losses = 0;
// ARRAYS TO STORE GUESSES AND ANSWERS
var guesses = [];
var blankAnswer = [];
// VAR TO SET COMPUTER CHOICE
var computerChoice;

// VARIABLES FOR WORD CHOICE AND ALPHABET VERIFICATION
var answers = ["mustang", "camaro", "corvette", "challenger", "charger"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


// **********************************************************************
// 
//            FUNCTIONS 
// 
// **********************************************************************


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
        computerChoicePic.classList.add("hidden"); //HIDE CAR PIC
        lineupPic.classList.remove("hidden"); //SHOW LINEUP PIC
        gameOverPic.classList.add("hidden"); //HIDE GAMEOVER PIC
        getStartedText.innerText = "Let's Play Again!"
        blankAnswer = [];
        guesses = [];
        lose.innerText = "";
        win.innerText = "";
        newComputerChoice();
        // SHOW HINT BUTTON
        hintButton.classList.remove("hidden");
        // REMOVE PREVIOUS HINT TEXT
        hintText.innerText = "";
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
        getStartedText.innerText = "";
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

// CHECK SCORE FOR WIN AND LOSS INITIATE NEW GAME RESET
function checkScore() {
    if (!blankAnswer.includes(" _ ")) {
        // SHOW WIN TEXT AND INCREMENT WINCOUNTER
        win.innerText = "YOU WIN!!!";
        wins++;
        // REMOVE LINEUP PICTURE
        lineupPic.classList.add("hidden");
        // SHOW PICTURE OF COMPUTERCHOICE
        computerChoicePic.classList.remove("hidden");
        newGame();
    }
    if (life === 0) {
        // GAME OVER YOU LOSE TEXT AND DECREMENT LOSSCOUNTER
        lose.innerText = "YOU LOSE";
        losses++;
        // REMOVE LINEUP PICTURE
        lineupPic.classList.add("hidden");
        // SHOW GAME OVER PICTURE
        gameOverPic.classList.remove("hidden");
        // SET WORD TO ANSWER
        blankAnswer = computerChoice.toUpperCase();
        newGame();
    }
    winCounter.innerText = wins;
    lossesCounter.innerText = losses;
}




// **********************************************************************
// 
//            GAME EXECUTION 
// 
// **********************************************************************



// INITIATE FIRST GAME ON SCREEN LOAD
newComputerChoice();

// EXECUTES WHEN PLAYER PRESSES A KEY
document.onkeyup = function(event) {
    // SET KEYPRESS TO VARIABLE FOR USE IN FUNCTIONS
    var userGuess = event.key
    userGuess = userGuess.toLowerCase(); //CONVERT TO LOWER CASE JUST IN CASE CAPS LOCK IS ON USER KEYBOARD

    // CHECK IF ANSWER IS ALREADY FULFILLED, IF SO, DONT RUN ANY CODE ON KEYPRESSES
    if (blankAnswer.includes(" _ ")) {

        // CHECK IF KEY HAS BEEN PRESSED BEFORE AND PUSH TO ARRAY OF GUESSES IF NOT
        validKey(userGuess);

        // CHECK IF KEY PRESS MATCHES A LETTER IN THE ANSWER THEN PUSH GUESS TO ARRAY OF GUESSES
        check(userGuess);

        // CHECK SCORE FOR GAME OVER
        checkScore();
    }
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
    hintButton.classList.add("hidden");
    if (computerChoice === "camaro" || computerChoice === "corvette") {
        hintText.innerText = "Chevrolet makes this car";
    }
    if (computerChoice === "charger" || computerChoice === "challenger") {
        hintText.innerText = "Dodge makes this car";
    }
    if (computerChoice === "mustang") {
        hintText.innerText = "Ford makes this car";
    }
}

