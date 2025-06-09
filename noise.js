var Dot = function(p1, p2){
    return p1.x*p2.x + p1.y*p2.y;
};
var interp = function(a, b, p){
    var smooth = 6*pow(p, 5) - 15*pow(p, 4) + 10*pow(p, 3);
    return a + smooth*(b - a);
};
var NoiseGen = function(x1, y1, x2, y2, s){
    var grid = {x:x1, y:y1, s:s, a:[]};
    for(var x = x1; x < x2 + s; x += s){
        grid.a.push([]);
    }
    for(var x = 0; x < grid.a.length; x++){
        for(var y = y1; y < y2 + s; y += s){
            grid.a[x].push({x:random(-1,1), y:random(-1,1)});
        }
    }
    return grid;
};
var Normalize = function(p){
    var d = dist(0, 0, p.x, p.y);
    return {x:p.x/d, y:p.y/d};
};
var Grid = NoiseGen(0, 0, 600, 600, 20);
var Noise = function(grid, x, y){
    var X = floor((x - grid.x)/grid.s);
    var Y = floor((y - grid.y)/grid.s);
    
    if(grid.a.length === 0 || grid.a[0].length === 0 || X < 0 || X >= grid.a.length - 1 || Y < 0 || Y >= grid.a[0].length - 1){
        return NaN;
    }
    
    var tl = grid.a[X][Y];
    var bl = grid.a[X][Y + 1];
    var tr = grid.a[X + 1][Y];
    var br = grid.a[X + 1][Y + 1];
    
    var px = (x - (grid.x + X*grid.s))/grid.s;
    var py = (y - (grid.y + Y*grid.s))/grid.s;
    
    var Vtl = {x:px, y:py};
    var Vbl = {x:px, y:-(1-py)};
    var Vtr = {x:-(1-px), y:py};
    var Vbr = {x:-(1-px), y:-(1-py)};
    
    var Dtl = Dot(tl, Vtl);
    var Dbl = Dot(bl, Vbl);
    var Dtr = Dot(tr, Vtr);
    var Dbr = Dot(br, Vbr);
    
    var topMid = interp(Dtl, Dtr, px);
    var botMid = interp(Dbl, Dbr, px);
    var mid = interp(topMid, botMid, py);
    
    return (mid + 1)/2;
};
var speed = 20;
var xx = 0;
draw = function() {
    if(xx < 600){
    for(var x = xx; x < xx + speed; x++){
        for(var y = 0; y < 600; y++){
            var n = Noise(Grid, x, y)*255;
            noFill();
            stroke(0, 0, 0, Noise(Grid, x, y)*255);
            point(x, y);
        }
    }
    xx += speed;
    }
};