//you sometimes have to click restart a few times before there is a viable path to the finish
//increase this if it creashes
var Size = 1;
var Width = 600;
var Height = 600;
var grid = [];
//number of a star iterations in each frame
var speed = 30;
//the larger, the straiter the path will try to be
//straight paths are not good for mazes or obsticles that require turning around
var optimizeFactor = 2;
textAlign(CENTER, CENTER);
var found = false;
for(var x = 0; x < Width; x += Size){
    grid.push([]);
}
for(var x = 0; x < grid.length; x++){
    for(var y = 0; y < Height; y += Size){
        grid[x].push({value:-1, f:0, g:0, z:0, trail:false, searched:false, block:false});
    }
}
var numBlocks = 300000;
var Start = {x:0, y:0};
var End = {x:grid.length - 1, y:grid[0].length - 1};
var current = {x:Start.x, y:Start.y};
var searchList = [];
var aStar = function(){
    var ming = -1;
    var minval = -1;
    var mini = 0;
    for(var i = 0; i < searchList.length;i++){
        if(searchList[i].active && (minval === -1 || searchList[i].value < minval)){
            if(minval !== searchList[i].value || (ming === -1 || searchList[i].g < ming)){
            current = {x:searchList[i].x, y:searchList[i].y};
            minval = searchList[i].value;
            ming = searchList[i].g;
            mini = i;
            }
        }
    }
    if(mini >= 0 && mini < searchList.length){
        searchList.splice(mini,1);
    }
    grid[Start.x][Start.y].f = 0;
    var currentf = grid[current.x][current.y].f;
    for(var x = -1; x <= 1;x++){
        for(var y = -1; y <= 1;y++){
            if(current.x + x >= 0 && current.x + x < grid.length && current.y + y >= 0 && current.y + y < grid[0].length && !grid[current.x + x][current.y + y].block && !(x === 0 && y === 0) && !grid[current.x + x][current.y + y].searched){
                var tempf = currentf + dist(x, y, 0, 0)*Size;
                var tempg = dist(current.x + x, current.y + y, End.x, End.y)*Size;
                var tempValue = tempg*optimizeFactor + tempf;
                searchList.push({active:true, value:tempValue, g:tempg, x:current.x + x, y:current.y + y});
                grid[current.x + x][current.y + y].f = tempf;
                grid[current.x + x][current.y + y].g = tempg;
                grid[current.x + x][current.y + y].value = tempValue;
                grid[current.x + x][current.y + y].searched = true;
                fill(255, 0, 255);
                rect((current.x + x)*Size, (current.y + y)*Size,Size,Size);
            }
        }
    }
    for(var i = 0; i < searchList.length;i++){
        if(searchList[i].x === End.x && searchList[i].y === End.y){
            found = true;
        }
    }
};
var walkPath = function(X, Y){
    var currentf = grid[X][Y].f;
    var minval = -1;
    var nextx = x;
    var nexty = y;
    for(var x = -1; x <= 1;x++){
        for(var y = -1; y <= 1;y++){
            if(X + x >= 0 && X + x < grid.length && Y + y >= 0 && Y + y < grid[0].length && !grid[X + x][Y + y].block && !(x === 0 && y === 0) && grid[X + x][Y + y].value !== -1 && (minval === -1 || grid[X + x][Y + y].f < minval)){
                minval = grid[X + x][Y + y].f;
                nextx = X + x;
                nexty = Y + y;
            }
        }
    }
    return {x:nextx, y:nexty};
};
var drawGridStart = function(){
    noStroke();
    for(var x = 0; x < grid.length; x++){
        for(var y = 0; y < grid[x].length; y++){
            if(grid[x][y].block){
                fill(0, 0, 0);
                rect(x*Size, y*Size,Size,Size);
            }
        }
    }
};
for(var x = 0; x < grid.length; x++){
    for(var y = 0; y < grid[x].length; y++){
        if(x === Start.x && y === Start.y){
            grid[x][y].block = false;
        }
        if(x === End.x && y === End.y){
            grid[x][y].block = false;
        }
    }
}
var walkxy = End;
var doneWalking = false;
var stime = 20;
var time = 0;
for(var i = 0; i < numBlocks;i++){
    var rand1 = round(random(0,grid.length - 1));
    var rand2 = round(random(0,grid[0].length - 1));
    if(dist(rand1, rand2, Start.x, Start.y) > 15 && dist(rand1, rand2, End.x, End.y) > 15){
        grid[rand1][rand2].block = true;
    }
}
drawGridStart();
draw = function() {
    for(var t = 0; t < speed;t++){
        if(!found){
            aStar();
        } else if(!doneWalking){
            walkxy = walkPath(walkxy.x, walkxy.y);
            if(walkxy.x >= 0 && walkxy.x < grid.length && walkxy.y >= 0 && walkxy.y < grid[0].length){
                grid[walkxy.x][walkxy.y].trail = true;
                fill(13, 0, 255);
                rect(walkxy.x*Size, walkxy.y*Size,Size,Size);
            }
            if(walkxy === Start){
                doneWalking = true;
            }
        }
    }
};