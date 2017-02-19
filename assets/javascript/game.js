//psuedocode
//define all variables
//randomly choose word from array (keep hidden)
//create functions for the following: key-stroke, mouse click, choose a new word and "hide" it,
//                                   check to see if the letter has been chosen already, 
//                                   check to see how many guesses remain,
//                                   check to see if letter chosen is in the answer,
//                                   
//

//Global variables.  I may have over thought this
var cannabisStrain = ["blue dream", "og kush", "girl scout cookies", "green crack", "sour diesel", "strawberry cough",
    "granddaddy purple", "trainwreck", "skywalker og", "bruce banner", "jack herer", "fire og",
    "bubba kush", "durban poison", "golden goat", "northern lights", "alaskan thunder fuck",
    "purple haze", "white widow", "pineapple express", "headband", "blue cheese", "grape ape",
    "white rhino", "maui wowie", "chemdawg", "la confidential", "chocolope", "super lemon haze", "zensation",
    "wonder woman", "white cookies", "blueberry widow", "grape skunk", "ultra sonja", "pure power plant", "agent orange",
    "ghost train haze", "gorilla glue", "gods gift", "berry white", "tangerine dream", "fruity pebbles", "sunset sherbert",
    "juicy fruit", "acapulco gold", "great white shark"
];
var hiddenWord = [];
var hiddenUnderlinedWord = [];
var guesses;
var usedLetters = [];
var wordbank = cannabisStrain.length;
var computerChoice;
var computerUnderlinedChoice;
var wins = 0;
var losses = 0;

//reset function
var resetVariables = function() {
    hiddenWord = [];
    hiddenUnderlinedWord = [];
    usedLetters = [];
    computerChoice = " ";
    computerUnderlinedChoice = " ";

}

//pick a random word and blank it out
var randomStrain = function() {
    resetVariables();
    computerChoice = cannabisStrain[Math.floor(Math.random() * cannabisStrain.length)];

    document.getElementById("hangmanImage").src = "assets/images/" + computerChoice + ".jpg";

    console.log(computerChoice);
    for (i = 0; i < computerChoice.length; i++) {
        hiddenWord[i] = computerChoice.charAt(i);
        if (computerChoice.charAt(i) !== " ") {
            hiddenUnderlinedWord[i] = "_";
        } else {
            hiddenUnderlinedWord[i] = "*";
        }
        //console.log(hiddenUnderlinedWord);
    }
    guesses = 6;
    computerUnderlinedChoice = hiddenUnderlinedWord.join(" ");
    document.getElementById("answer").innerHTML = computerUnderlinedChoice.replace(/\*/gi, "&nbsp &nbsp");
    document.getElementById("guesses").innerHTML = "Guesses:" + " " + guesses;
}

//Update Letters to see if they are in the hidden word
var letterChecker = function(letter) {
    var letterChange = 0;
    for (i = 0; i < computerChoice.length; i++) {
        hiddenWord[i] = computerChoice.charAt(i);
        if (computerChoice.charAt(i) == letter) {
            hiddenUnderlinedWord[i] = letter.toUpperCase();
            letterChange++;
        }
    }
    if (letterChange < 1) {
        guesses--;
        document.getElementById("guesses").innerHTML = "Guesses:" + " " + guesses;
    }
    computerUnderlinedChoice = hiddenUnderlinedWord.join(" ");
    document.getElementById("answer").innerHTML = computerUnderlinedChoice.replace(/\*/gi, "&nbsp &nbsp");
}

//Checks to see if a letter has already been chosen
var validator = function(userGuess) {
    //if userguess is a usedletter not valid
    if (usedLetters.indexOf(userGuess) === -1) {
        return true;
    } else {
        return false;
    }
}


//Function to see if the game is over or continue to play
var gameChecker = function() {
    word1 = hiddenWord.join("").toUpperCase();
    word2 = hiddenUnderlinedWord.join("").toUpperCase().replace(/\*/gi, " ");
    if (word1.toUpperCase() == word2.toUpperCase()) {
        wins++;
        document.getElementById("wins").innerHTML = "Wins:" + " " + wins;
        alert("You Know your Cannabis!!!!!" + " " + computerChoice);
        randomStrain();
    }

    if (guesses < 1) {
        losses++;
        document.getElementById("losses").innerHTML = "Losses:" + " " + losses;
        alert("Maybe a trip to the dispensary is in order.  The correct strain was" + " " + computerChoice);
        randomStrain();
    }
}

//Run Program Here
randomStrain();
document.onkeyup = function(event) {
    userGuess = event.key;
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (!validator(userGuess)) {
            alert("You have already choses this letter, please choose again");
        } else {
            usedLetters.push(userGuess);
            letterChecker(userGuess);
            gameChecker();
        }
    } else {
        alert("Please choose a valid letter between A-Z");
    }
}
