var Dot = function(p1, p2){
    return p1.x*p2.x + p1.y*p2.y;
};
var interp = function(a, b, p){
    var smooth = 6*pow(p, 5) - 15*pow(p, 4) + 10*pow(p, 3);
    return a + smooth*(b - a);
};
var Normalize = function(p){
    var d = dist(0, 0, p.x, p.y);
    return {x:p.x/d, y:p.y/d};
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
var Grid = NoiseGen(0, 0, 100, 100, 0.5);
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
    var Vbl = {x:px, y:-(1.0-py)};
    var Vtr = {x:-(1.0-px), y:py};
    var Vbr = {x:-(1.0-px), y:-(1.0-py)};
    
    var Dtl = Dot(tl, Vtl);
    var Dbl = Dot(bl, Vbl);
    var Dtr = Dot(tr, Vtr);
    var Dbr = Dot(br, Vbr);
    
    var topMid = interp(Dtl, Dtr, px);
    var botMid = interp(Dbl, Dbr, px);
    var mid = interp(topMid, botMid, py);
    
    return (mid + 1.5)/3;
};
var Noise2 = function(x, y){
    return (Noise(Grid, x, y) + Noise(Grid, x/2, y/2) + Noise(Grid, x/4, y/4))/3;
};
var m = 0;
var grid = function(x,y){
    var N = (abs(Noise2((x + m)/113,(y + 50)/113)-0.5)*68 + abs(Noise2((x + m)/9,y/9)-0.5)*17)*20;
    var N2 = (abs(Noise2((x + m + 50)/113,(y + 50)/113)-0.5)*68 + abs(Noise2((x + m)/9,y/9)-0.5)*17)*20;
    var N3 = (abs(Noise2((x + m)/113,y/113)-0.5)*68 + abs(Noise2((x + m)/9,y/9)-0.5)*17)*20;
    stroke(N, N2, N3);
point(x,y);
    var x1 = x/4 + sin(y*1.1)*421;
    var n = (Noise2(x1/3,y/3)*175 + Noise2(x1/100,y/100)*256)/14.1 + 104;
    stroke(0, 0, 0,n - 100);
point(x,y);
};
var speed = 10;
var xx = 0;
draw = function() {
    if(xx < 600){
    for(var x = xx; x < xx + speed; x++){
        for(var y = 0; y < 600; y++){
            grid(x, y);
        }
    }
    xx += speed;
    }
};