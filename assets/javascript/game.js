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
var computerChoiceArray = computerChoice.split('');

// FOR LOOP TO TAKE ARRAY OF LETTERS AND CONVERT THEM TO ARRAY OF DASHES IN PLACE OF EACH LETTER.
for ( let i = 0; i < computerChoiceArray.length; i++) {
    blankAnswer.push("-");
}
// FUNCTION TO REMOVE COMMAS FROM THE ARRAY WHEN PRINTING TO SCREEN
var answerString = function() {
    var printThis = "";
    for(var i = 0; i < blankAnswer.length; i++) {
        printThis += blankAnswer[i];
    }
    return printThis;
}

// PRINT NO-COMMA ARRAY TO SCREEN
word.innerText = answerString();




// LIVES
lives.innerText = life;

