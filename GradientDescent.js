//function
var f = function(x){
    return 0.12*pow(x-1.9, 4) + pow(x-2, 3) + 2*pow(x-2, 2);
};
//derivative of function
var f1 = function(x){
    return 0.12*4*pow(x-1.9, 3) + 3*pow(x-2, 2) + 4*(x-2);
};
//this is the starting value, move it to see gradient descent in action
var X = -0.6;

var xrange = 10;
var yrange = 60;
var maxIter = 1000;
var Size = {x:600, y:600};
var center = {x:Size.x/2, y:Size.y/2};
var Alpha = 0.01;

var terminate = function(x, dx){
    return (dx < 0.01);
};
var getNext = function(x){
    return x - Alpha*f1(x);
};
var convertxy = function(x, y){
    return {x: x*(Size.x/xrange), y: y*(Size.y/yrange)};
};
line(-9999,center.y, 9999, center.y);
line(center.x, -9999, center.x, 9999);
var getpos = function(x, y)
{
    var p = convertxy(x, y);
    return {x: p.x + center.x, y:center.y - p.y};
};
for(var x = -xrange; x < xrange; x += xrange/300){
    var xy = getpos(x, f(x));
    var xy2 = getpos(x + xrange/300, f(x + xrange/300));
    line(xy.x, xy.y, xy2.x, xy2.y);
}
fill(0, 0, 0);
for(var i = 0; i < maxIter; i++){
    var xy = getpos(X, f(X));
    if(i !== 0){
    ellipse(xy.x, xy.y, 5, 5);
    } else{
        ellipse(xy.x, xy.y, 10, 10);
    }
    X = getNext(X);
    if(terminate(X)){
        break;
    }
}