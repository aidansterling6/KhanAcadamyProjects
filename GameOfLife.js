//size of each tile
var Size = 2;
//width of board
var Width = 400;
//height of board
var Height = 400;
var seedOffset = {x:160, y:160};
//add ones to this grid for the starting pattern you want

var seedGrid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    /*
var seedGrid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    */
var grid = [];
for(var x = 0; x < Width;x += Size){
    grid.push([]);
}
for(var x = 0; x < grid.length;x++){
    for(var y = 0; y < Height;y += Size){
        grid[x].push({alive:false, lalive:false});
    }
}
var lastgrid = [];
for(var x = 0; x < Width;x += Size){
    lastgrid.push([]);
}
for(var x = 0; x < lastgrid.length;x++){
    for(var y = 0; y < Height;y += Size){
        lastgrid[x].push({alive:false, lalive:false});
    }
}
var DrawOnStart = function(){
    noStroke();
    for(var x = 0; x < grid.length;x++){
        for(var y = 0; y < grid[x].length;y++){
            if(grid[x][y].alive){
                fill(0, 0, 0);
                rect(x*Size, y*Size, Size, Size);
                //grid[x][y].alive = false;
            } else{
                fill(255, 255, 255);
                rect(x*Size, y*Size, Size, Size);
                //grid[x][y].alive = true;
            }
            var count = 0;
            for(var x1 = -1; x1 <= 1;x1++){
                for(var y1 = -1; y1 <= 1;y1++){
                    if((x1 === 0 && y1 === 0) === false && x + x1 >= 0 && x + x1 < grid.length && y + y1 >= 0 && y + y1 < grid[x].length && grid[x + x1][y + y1].alive){
                        count++;
                    }
                }
            }
            fill(255, 0, 0);
            //text(count, x*Size + Size/3, y*Size + Size/1.5);
        }
    }
};
var update = function(){
    noStroke();
    textSize(10);
    for(var x = 0; x < grid.length;x++){
        for(var y = 0; y < grid[x].length;y++){
            grid[x][y].lalive = grid[x][y].alive;
        }
    }
    for(var x = 0; x < grid.length;x++){
        for(var y = 0; y < grid[x].length;y++){
            var count = 0;
            for(var x1 = -1; x1 <= 1;x1++){
                for(var y1 = -1; y1 <= 1;y1++){
                    if((x1 === 0 && y1 === 0) === false && x + x1 >= 0 && x + x1 < grid.length && y + y1 >= 0 && y + y1 < grid[x].length && grid[x + x1][y + y1].lalive){
                        count++;
                    }
                }
            }
            //fill(0, 0, 0);
            //text(count, x*Size + Size/3, y*Size + Size/1.5);
            var live = grid[x][y].lalive;
            if((live && count < 2) || (live && count > 3)){
                fill(255, 255, 255);
                rect(x*Size, y*Size, Size, Size);
                grid[x][y].alive = false;
            }
            if((live && count === 2) || count === 3){
                fill(0, 0, 0);
                rect(x*Size, y*Size, Size, Size);
                grid[x][y].alive = true;
            }
            fill(255, 0, 0);
            //text(count, x*Size + Size/3, y*Size + Size/1.5);
        }
    }
};
    for(var x = 0; x < seedGrid.length;x++){
        for(var y = 0; y < seedGrid[x].length;y++){
            //seedGrid[x][y] = round(random(0,1));
            if(seedGrid[x][y] === 1){
                grid[seedOffset.x + x][seedOffset.y + y].alive = true;
                grid[seedOffset.x + x][seedOffset.y + y].lalive = true;
            } else{
                grid[seedOffset.x + x][seedOffset.y + y].alive = false;
                grid[seedOffset.x + x][seedOffset.y + y].lalive = false;
            }
        }
    }
DrawOnStart();
var stime = 1;
var time = stime;
draw = function() {
    if(time < 0){
        background(255, 255, 255);
        update();
        time = stime;
    }
    //background(255, 255, 255);
    //DrawOnStart();
    time--;
};