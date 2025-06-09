//Just click a column to place a piece, 4 of one color in a row wins
var BoardWidth = 10;
var BoardHight = 10;
var TileSize = 27;
var BoardX = 200 - TileSize*BoardWidth/2 + TileSize/2;
var BoardY = 245 - TileSize*BoardWidth/2 + TileSize/2;
var board = [];
for(var i = 0; i < BoardWidth;i++){
    board.push([]);
}
for(var i = 0; i < BoardWidth;i++){
    for(var o = 0; o < BoardHight;o++){
        board[i].push(0);
    }
}
var DrawBoard = function(x, y){
    fill(255, 255, 255);
    strokeWeight(1);
    stroke(0, 0, 0);
    rect(x - TileSize/2 - 1, y - TileSize/2 - 1, BoardWidth*TileSize+1, BoardHight*TileSize+1);
    for(var i = 0; i < board.length;i++){
    for(var o = 0; o < board[i].length;o++){
        fill(255, 255, 255);
        if(board[i][o] === 1){
            fill(255, 0, 0);
        }
        if(board[i][o] === 2){
            fill(4, 0, 255);
        }
        ellipse(x + i*TileSize, y + o*TileSize,TileSize,TileSize);
    }
}
};
var PlacePiece = function(x,player){
    if(!(x >= BoardWidth || x < 0)){
        for(i = BoardHight - 1; i >= 0;i--){
            if(board[x][i] === 0){
                board[x][i] = player;
                return true;
            }
        }
    }
    return false;
};
var CheckLine = function(x,y,cx,cy){
    var player = board[x][y];
    var count = 0;
    while(count < 4){
        if(x > BoardWidth - 1 || x < 0 || y > BoardHight - 1 || y < 0 || board[x][y] !== player || player === 0){
            return false;
        }
        x += cx;
        y += cy;
        count++;
    }
    strokeWeight(TileSize/2.5);
    stroke(0, 0, 0);
    line(BoardX + (x-cx*4)*TileSize, BoardY + (y-cy*4)*TileSize, BoardX + (x-cx*1)*TileSize, BoardY + (y-cy*1)*TileSize);
    return true;
};
var CheckWin = function(){
    for(var i = 0; i < BoardWidth;i++){
        for(var o = 0; o < BoardHight;o++){
            if(CheckLine(i,o,1,0) || CheckLine(i,o,0,1) || CheckLine(i,o,1,1) || CheckLine(i,o,1,-1)){
                return true;
            } 
        }
    }
    return false;
};
var CurrentTurn = 1;
var ClickDelay = 5;
var time = 0;
var win = false;
var winner = 0;
draw = function() {
    background(255, 255, 255);
    textAlign(CENTER);
    textSize(40);
    fill(0, 0, 0);
    text("Player " + CurrentTurn + "'s turn", 200, 90);
    if(!win){
        if(!mouseIsPressed){
            time--;
        }
        DrawBoard(BoardX, BoardY);
        if(mouseIsPressed && mouseX > BoardX - TileSize/2 && mouseX < BoardX + BoardWidth*TileSize && mouseY > BoardY - TileSize/2 && mouseY < BoardY + BoardHight*TileSize && time < 0 && PlacePiece(round((mouseX - BoardX)/TileSize),CurrentTurn)){
            time = ClickDelay;
            if(CheckWin()){
                win = true;
                winner = CurrentTurn;
            }
            if(CurrentTurn === 1){
                CurrentTurn = 2;
            } else{
                CurrentTurn = 1;
            }
        }
    } else{
        background(227, 227, 227);
        textAlign(CENTER);
        textSize(40);
        fill(0, 204, 27);
        text("Player " + winner + " won!!", 200, 90);
        DrawBoard(BoardX, BoardY);
        CheckWin();
    }
};