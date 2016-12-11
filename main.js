"use strict";
var characters = ["circle", "cross"];
var first = [player, computer];




var gameBoard = {
    tiles: [1,2,3,4,5,6,7,8,9],
    startGame: function() {
        // TODO: Hide character selection screen and show game board
    },
    checkForWin: function() {
        // TODO: After each move check if the player or the computer has a won
    },
    displayGameEndScreen: function() {
        // TODO: Display win, loose or draw screen
    }
}

var player = {
    setCharacter: function(character) {
        player.character = character;
        computer.setCharacter();
    },
    character: "",
    tiles: [] // A collection of tiles the player has chosen
}

var computer = {
    character: "",
    tiles: [], // A collection of tiles the computer has chosen
    setCharacter: function() {
        computer.character = (player.character === "circle")?"cross":"circle";
    },
    makeMove: function() {
        // TODO: Determens what move the computer makes next
    }
}
