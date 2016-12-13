var first = [player, computer];
var characters = {
    circle: "<svg version=\"1.1\"viewBox=\"0 0 500 500\">\
        <circle class=\"circleSvg\" fill=\"none\"/>\
    </svg>",
    cross: '<svg version="1.1"viewBox="0 0 500 500">\
        <line x1="20%" y1="80%" x2="80%" y2="20%"\
            stroke-width="10" stroke="black"/>\
        <line x1="20%" y1="20%" x2="80%" y2="80%"\
            stroke-width="10" stroke="black"/>\
    </svg>'
}
var gameBoard = {
    tiles: [1,2,3,4,5,6,7,8,9],
    startGame: function() {
        // TODO: Hide character selection screen and show game board
    },
    checkForWin: function() {
        var winnerArray = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        var playerWins = [false,false,false];
        var computerWins = [false,false,false];
        for(var i = 0; i < winnerArray.length; i++){
            for(var x = 0; x < winnerArray[i].length; x++){
                if(player.tiles.includes(winnerArray[i][x])){
                    playerWins[x] = true;
                }else{
                    playerWins[x] = false;
                }
                if(computer.tiles.includes(winnerArray[i][x])){
                    computerWins[x] = true;
                }else{
                    computerWins[x] = false;
                }
            }
            if(!playerWins.includes(false)){
                gameBoard.displayGameEndScreen("You Win!");
            }else if(!computerWins.includes(false)){
                gameBoard.displayGameEndScreen("You Loose!");
            }
        }
    },
    displayGameEndScreen: function(text) {
        document.getElementById("endScreen").innerHTML = "<h1>" + text + "</h1>";
        document.getElementById("endScreen").style.display = "inline-flex";
    },
    drawTiles: function() {
        gameBoard.tiles.forEach(function(tile){
            if(player.tiles.includes(tile)){
                gameBoard.drawCharacter(player.getCharacter(), tile);
            }else if(computer.tiles.includes(tile)){
                gameBoard.drawCharacter(computer.getCharacter(), tile);
            }else{
                gameBoard.drawCharacter("", tile);
            }
        });
        gameBoard.checkForWin();
    },
    drawCharacter: function(character, tile){
        document.getElementById("button"+tile).innerHTML = character;
    },
    resetBoard: function(){
        player.tiles = [];
        computer.tiles = [];
        document.getElementById("endScreen").style.display = "none";
    }
}
var player = {
    character: "",
    tiles: [], // A collection of tiles the player has chosen
    setCharacter: function(character) {
        player.character = character;
        computer.setCharacter();
    },
    getCharacter: function(){
        return player.character;
    },
    addTile: function(tile){
        if(gameBoard.tiles.includes(tile)){
            player.tiles.push(tile);
        }
        computer.makeMove();
    }
}
var computer = {
    character: "",
    tiles: [], // A collection of tiles the computer has chosen
    setCharacter: function() {
        computer.character = (player.character === characters.circle)?characters.cross:characters.circle;
    },
    getCharacter: function(){
        return computer.character;
    },
    makeMove: function(opponentTiles) {
    }
}
player.setCharacter(characters.circle);
//Click listeners
var buttons = document.getElementsByClassName("button");
for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(event){
        clickHandler(event);
    }, false);
}
function clickHandler(event){
    var arr = event.target.id.split("");
    if(gameBoard.tiles.includes(parseInt(arr[arr.length -1]))){
        player.addTile(parseInt(arr[arr.length -1]));
    }else if(event.target.id === "buttonReset"){
        gameBoard.resetBoard();
    }else if(event.target.id === "buttonBack"){
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("selectionScreen").style.display = "block";
        gameBoard.resetBoard();
    }else if(event.target.id === "circle"){
        document.getElementById("gameScreen").style.display = "block";
        document.getElementById("selectionScreen").style.display = "none";
        gameBoard.resetBoard();
        player.setCharacter(characters.circle);
    }else if(event.target.id === "cross"){
        document.getElementById("gameScreen").style.display = "block";
        document.getElementById("selectionScreen").style.display = "none";
        gameBoard.resetBoard();
        player.setCharacter(characters.cross);
    }
    gameBoard.drawTiles();
}

//Tests
function testDrawTiles(){
    player.setCharacter(characters.circle);
    player.tiles = [1,3,4];
    computer.tiles = [2,5,8];
    gameBoard.drawTiles();
}
//testDrawTiles();
