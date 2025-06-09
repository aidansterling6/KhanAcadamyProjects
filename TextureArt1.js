frameRate(100);
var num = 0;
var ll = get(0,0,10,10);
var l = get(0,0,10,10);
var r = get(0,0,10,10);
var rr = get(0,0,10,10);

var ll2 = get(0,0,10,10);
var l2 = get(0,0,10,10);
var r2 = get(0,0,10,10);
var rr2 = get(0,0,10,10);

var ll3 = get(0,0,10,10);
var l3 = get(0,0,10,10);
var r3 = get(0,0,10,10);
var rr3 = get(0,0,10,10);

var ll4 = get(0,0,10,10);
var l4 = get(0,0,10,10);
var r4 = get(0,0,10,10);
var rr4 = get(0,0,10,10);
var vidLength = 1;
var X = 200;
var Y = 200;
var vid = [];
var m = 0;
var vidf = 0;
var xshift = 0;
var yshift = 0;
//1920*8000
var grid = function(x,y){
    x += xshift;
    y += yshift;
    var N = (abs(noise((x + m)/113,(y + 50)/113)-0.5)*68 + abs(noise((x + m)/9,y/9)-0.5)*17)*20;
    var N2 = (abs(noise((x + m + 50)/113,(y + 50)/113)-0.5)*68 + abs(noise((x + m)/9,y/9)-0.5)*17)*20;
    var N3 = (abs(noise((x + m)/113,y/113)-0.5)*68 + abs(noise((x + m)/9,y/9)-0.5)*17)*20;
    stroke(N, N2, N3);
    x -= xshift;
    y -= yshift;
point(x,y);
};
var i = 0; 
var j = 0;
var bSize = 50;
var screenSize = 550;
draw = function() {
    if(j*bSize < screenSize){
        for(var x = i*bSize;x < i*bSize + bSize;x++){
            for(var y = j*bSize;y < j*bSize + bSize;y++){
            grid(x,y);
            }    
        }
        i++;
        if(i*bSize >= screenSize){
            i = 0;
            j++;
        }
    }
};