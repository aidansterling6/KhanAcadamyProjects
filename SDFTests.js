var grid = [];
for(var i = 0; i < 10; i++){
    grid.push([]);
}
for(var i = 0; i < grid.length; i++){
    for(var o = 0; o < 10; o++){
        var b = false;
        if(dist(i, o, 5, 5) < 3){
            b = true;
        }
        grid[i].push({x:random(-0.5,0.5), y:random(-0.5,0.5), f:b, b:false, d:-1, m:{i:0, o:0}});
    }
}
var getPos = function(i, o){
    return {x:i*15 + 10, y:o*15 + 50};
};
var getPos2 = function(i, o){
    return {x:i*15 + grid[i][o].x*15 + 10, y:o*15 + grid[i][o].y*15 + 50};
};

var Min = {i:0, o:0, d:-1};
var Min2 = {i:0, o:0, d:-1};


for(var i = 1; i < grid.length - 1; i++){
        for(var o = 1; o < grid[i].length - 1; o++){
            if(grid[i][o].f === false){
                grid[i][o].d = -1;
                for(var a = -1; a <= 1; a += 1){
                    for(var b = -1; b <= 1; b += 1){
                        if((a === 0 && b === 0) === false && grid[i + a][o + b].f){
                            var p = getPos(i, o);
                            var p2 = getPos2(i + a, o + b);
                            var d = dist(p.x, p.y, p2.x, p2.y);
                            if(grid[i][o].d === -1 || d < grid[i][o].d){
                                grid[i][o].d = d;
                                grid[i][o].m.i = i + a;
                                grid[i][o].m.o = o + b;
                                grid[i][o].b = true;
                            }
                        }
                    }
                }
            }
        }
    }


draw = function() {
    background(255, 255, 255);
    for(var i = -20; i < 20; i++){
        for(var o = -20; o < 20; o++){
            var p = getPos(i, o);
            noFill();
            stroke(0, 0, 0, 6);
            rect(p.x + 15/2, p.y + 15/2, 15, 15);
        }
    }
    for(var i = 0; i < grid.length; i++){
        for(var o = 0; o < grid[i].length; o++){
            var p = getPos(i, o);
            var p2 = getPos2(i, o);
            if(grid[i][o].f){
                noStroke();
                fill(0, 0, 0);
                ellipse(p.x, p.y, 2, 2);
                stroke(0, 0, 0);
                line(p.x, p.y, p2.x, p2.y);
            }
            if(grid[i][o].b){
                var p3 = getPos2(grid[i][o].m.i, grid[i][o].m.o);
                stroke(255, 0, 0);
                fill(255, 0, 0);
                ellipse(p.x, p.y, 3, 3);
                line(p.x, p.y, p3.x, p3.y);
            }
        }
    }
    
    
    
    Min.d = -1;
    Min2.d = -1;
    for(var i = 0; i < grid.length; i++){
        for(var o = 0; o < grid[i].length; o++){
            var p = getPos2(i, o);
            var d = dist(p.x, p.y, mouseX, mouseY);
            var p2 = getPos(i, o);
            var d2 = dist(p2.x, p2.y, mouseX, mouseY);
            if(grid[i][o].f){
                if(Min.d === -1 || d < Min.d){
                    Min.d = d;
                    Min.i = i;
                    Min.o = o;
                }
            }
            if(grid[i][o].b){
                if(Min2.d === -1 || d2 < Min2.d){
                    Min2.d = d2;
                    Min2.i = i;
                    Min2.o = o;
                }
            }
        }
    }
    var pos = getPos2(Min.i, Min.o);
    line(mouseX, mouseY, pos.x, pos.y);
    
    var pos2 = getPos(Min2.i, Min2.o);
    line(mouseX, mouseY, pos2.x, pos2.y);
};