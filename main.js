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
var playerCharacter;
var computerCharacter;
var buttons = document.getElementsByClassName("button");
for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(event){
        clickHandler(event);
    }, false);
}
function clickHandler(event){
    var arr = event.target.id.split("");
    if(event.target.classList.contains("gameUnit") && event.target.innerHTML === ""){
        var gameUnit =  parseInt(arr[arr.length-1]);
        var tile = convertToCoordinates(gameUnit);
        move(mainBoard,tile,1);
        drawCharacters();
        // window.setTimeOut()
        if(hasWinner(mainBoard) === 10){
            drawEndGameScreen("You Win!");
        }else if(hasWinner(mainBoard) === -10){
            drawEndGameScreen("You Loose!");
        }else if (hasWinner(mainBoard) === 0 && noTilesLeft(mainBoard)) {
            drawEndGameScreen("Draw!");
        }else{
            computerMove();
        }
    }else if(event.target.id === "buttonReset"){
        resetGame();
    }else if(event.target.id === "buttonBack"){
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("selectionScreen").style.display = "block";
        resetGame();
    }else if(event.target.id === "circle"){
        document.getElementById("gameScreen").style.display = "block";
        document.getElementById("selectionScreen").style.display = "none";
        playerCharacter = characters.circle;
        computerCharacter = characters.cross;
        resetGame();
    }else if(event.target.id === "cross"){
        document.getElementById("gameScreen").style.display = "block";
        document.getElementById("selectionScreen").style.display = "none";
        playerCharacter = characters.cross;
        computerCharacter = characters.circle;
        resetGame();
    }
}
var emptyBoard = [[{value:8,multiplier:0},{value:1,multiplier:0},{value:6,multiplier:0}],
                              [{value:3,multiplier:0},{value:5,multiplier:0},{value:7,multiplier:0}],
                              [{value:4,multiplier:0},{value:9,multiplier:0},{value:2,multiplier:0}]];
var mainBoard = _.cloneDeep(emptyBoard);
function resetGame(){
    var gameUnits = document.getElementsByClassName("gameUnit");
    for(var i = 0; i < gameUnits.length; i++){
        gameUnits[i].innerHTML = "";
    }
    mainBoard = _.cloneDeep(emptyBoard);
    document.getElementById("endScreen").style.display = "none";
}
function drawCharacters(){
    for(var i = 0; i < 9; i++){
        var tile = convertToCoordinates(i);
        if(mainBoard[tile[0]][tile[1]].multiplier === 1){
            document.getElementById("button"+i).innerHTML = playerCharacter;
        }else if(mainBoard[tile[0]][tile[1]].multiplier === -1){
            document.getElementById("button"+i).innerHTML = computerCharacter;
        }
    }
}
function drawEndGameScreen(text){
    document.getElementById("endScreen").innerHTML = "<h1>" + text + "</h1>";
    document.getElementById("endScreen").style.display = "inline-flex";
    window.setTimeout(function(){resetGame();}, 1000);
}
function hasWinner(board){
    for(var i = 0; i < board.length; i++){
        if(rowValue(board[i]) === 15){
            return 10;
        }else if ( rowValue(board[i]) === -15){
            return -10;
        }
        if(rowValue([board[0][i],board[1][i],board[2][i]]) === 15){
            return 10;
        }else if ( rowValue([board[0][i],board[1][i],board[2][i]]) === -15){
            return -10;
        }
    }
    if(rowValue([board[0][0],board[1][1],board[2][2]]) === 15){
        return 10;
    }else if(rowValue([board[0][0],board[1][1],board[2][2]]) === -15){
        return -10;
    }
    if(rowValue([board[2][0],board[1][1],board[0][2]]) === 15){
        return 10;
    }else if(rowValue([board[2][0],board[1][1],board[0][2]]) === -15){
        return -10;
    }
    return 0;
}
function noTilesLeft(){
    var tiles = document.getElementsByClassName("gameUnit");
    for(var i = 0; i < tiles.length; i++){
        if(tiles[i].innerHTML === ""){
            return false;
        }
    }
    return true;
}
function rowValue(row){
    return row[0].value * row[0].multiplier + row[1].value * row[1].multiplier + row[2].value * row[2].multiplier;
}
function move(board,tile, multiplier){
    if(board[tile[0]][tile[1]].multiplier !== 0){
        return board;
    }
    board[tile[0]][tile[1]].multiplier = multiplier;
    return board;
}
function convertToCoordinates(gameUnit){
    var tile = [];
    if(gameUnit < 3){
        tile[0] = 0;
    }else if(gameUnit < 6){
        tile[0] = 1;
    }else{
        tile[0] = 2;
    }
    tile[1] = gameUnit%3;
    return tile;
}
function computerMove(){
    var tile = [1,1];
    move(mainBoard,findMove(), -1);
    drawCharacters();
    if(hasWinner(mainBoard) === 10){
        drawEndGameScreen("You Win!");
    }else if(hasWinner(mainBoard) === -10){
        drawEndGameScreen("You Loose!");
    }else if (hasWinner(mainBoard) === 0 && noTilesLeft(mainBoard)) {
        drawEndGameScreen("Draw!");
    }
}
function findMove(){
    var nextTile;
    nextTile = node2(_.cloneDeep(mainBoard), 1,0);
    return nextTile;
}

function node(board, moveTracker,topTracker){
    var nodes = [];
    var thisBoard = _.cloneDeep(board);
    var possibleMoves = getPossibleMoves(thisBoard);
    if(possibleMoves.length === 0 || hasWinner(thisBoard) !== 0){
        return hasWinner(thisBoard) * moveTracker;
    }
    console.log(possibleMoves.length);
    for(var i = 0; i < possibleMoves.length; i++){
        thisBoard = move(thisBoard,possibleMoves[i], moveTracker);
        nodes.push([possibleMoves[i],node(thisBoard, -moveTracker,false)]);
    }
    if(!topTracker){
        return (hasWinner(thisBoard) * moveTracker);
    }
    var sortedNodes = nodes.sort(function(a,b){
        return a[1]-b[1];
    });
    for(var x = 0; x <sortedNodes.length; x++){
        // console.log("This is the sorted array : " + sortedNodes[x]);
    }
    return sortedNodes[0][0];
}

var finalMove = [];
function node2(board, player, depth){
    if(hasWinner(board) !== 0 || getPossibleMoves(board).length <= 0){
        console.log("Depth ----- " + depth + " ----- exit with value ------ " + hasWinner(board) + " --------");
        return hasWinner(board);
    }
    var scores = [];
    var moves = [];
    var possibleMoves = getPossibleMoves(board);
    for(var i = 0; i < possibleMoves.length; i++){
        var pBoard = _.cloneDeep(move(board, possibleMoves[i], player));
        scores.push(node2(pBoard, -player, depth+1));
        moves.push(possibleMoves[i]);
    }
    if(depth === 0){
        max_score_index = scores.indexOf(_.max(scores));
        console.log(depth + " exiting with: " + max_score_index);
        return moves[max_score_index];
    }
    if(player === 1){
        max_score_index = scores.indexOf(_.max(scores));
        console.log("MAX------------------------------------ " + depth +" ------------------------------------MAX");
        console.log("Largest possible is: " + scores[max_score_index]);
        console.log("Max score is " + _.max(scores));
        console.log("Max score index is " + scores.indexOf(_.max(scores)));
        console.log("Passing up -----VALUE----: " + scores[max_score_index]);
        console.log(scores);
        console.log(moves);
        console.log("Possible Moves : \n" + possibleMoves);
        return scores[max_score_index];
    }else{
        min_score_index = scores.indexOf(_.min(scores));
        console.log("MIN------------------------------------ " + depth +" ------------------------------------MIN");
        console.log("Min score is: " + _.min(scores));
        console.log("Min score index : " + scores.indexOf(_.min(scores)));
        console.log("Passing up -----VALUE----: " + scores[min_score_index]);
        console.log(scores);
        console.log(moves);
        console.log("Possible Moves : \n" + possibleMoves);
        return scores[min_score_index];
    }

}

function getPossibleMoves(board){
    var openTiles = [];
    for(var i = 0; i < board.length; i++){
        for(var n = 0; n < board[i].length; n++){
            if(board[i][n].multiplier === 0){
                openTiles.push([i,n]);
            }
        }
    }
    return openTiles;
}
