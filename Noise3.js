var lineDist = function(x, y, x1, y1, x2, y2){
    if(x2 === x1){
        return abs(x-x1);
    }
    if(y2 === y1){
        return abs(y-y1);
    }
    var m = (y2-y1)/(x2-x1);
    var m2 = -(x2-x1)/(y2-y1);
    if(m === m2){
        return NaN;
    }
    var X = (y-y1+m*x1-m2*x)/(m-m2);
    var Y = m*(X-x1)+y1;
    return dist(x, y, X, Y);
};
var percentBetween = function(x, y, x1, y1, x2, y2, x3, y3, x4, y4){
    return lineDist(x, y, x1, y1, x2, y2)/(lineDist(x, y, x1, y1, x2, y2)+lineDist(x, y, x3, y3, x4, y4));
};
var belowOnLine = function(x, y, x1, y1, x2, y2){
    var m = (y2-y1)/(x2-x1);
    if(y >= m*(x-x1)+y1){
        return true;
    }
    return false;
};
var rightOnLine = function(x, y, x1, y1, x2, y2){
    if(x2 === x1){
        if(x >= x1){
            return true;
        }
        return false;
    }
    var m = (y2-y1)/(x2-x1);
    if(x >= (y+m*x1-y1)/m){
        return true;
    }
    return false;
};
var aboveLine = function(x, y, x1, y1, x2, y2){
    var m = (y2-y1)/(x2-x1);
    if(y < m*(x-x1)+y1){
        return true;
    }
    return false;
};
var leftLine = function(x, y, x1, y1, x2, y2){
    if(x2 === x1){
        if(x < x1){
            return true;
        }
        return false;
    }
    var m = (y2-y1)/(x2-x1);
    
    if(x < (y+m*x1-y1)/m){
        return true;
    }
    return false;
};
var inBox = function(x, y, x1, y1, x2, y2, x3, y3, x4, y4){
    // stroke(0, 0, 0);
    // noFill();
    // quad(x1, y1, x2, y2, x3, y3, x4, y4);
    return (belowOnLine(x, y, x2, y2, x3, y3) && 
            rightOnLine(x, y, x1, y1, x2, y2) && 
            aboveLine(x, y, x4, y4, x1, y1) && 
            leftLine(x, y, x3, y3, x4, y4));
};
var interp = function(a, b, p){
    return a + p*(b - a);
};
var poly = function Fade(t){
	return 6*t*t*t*t*t - 15*t*t*t*t + 10*t*t*t;
};
var normalize = function(x, y){
    var d = sqrt(pow(x,2) + pow(y,2));
    //if(d === 0){
        return {x:x, y:y};
    //}
    //return {x:x/d, y:y/d};
};

var noiseGen = function(sx, sy, s, r){
    var grid = [];
    for(var X = 0; X < sx; X += s){
        grid.push([]);
    }
    for(var X = 0; X < grid.length; X++){
        for(var Y = 0; Y < sy; Y += s){
            grid[X].push(NaN);
        }
    }
    for(var X = 0; X < grid.length; X++){
        for(var Y = 0; Y < grid[X].length; Y++){
            var x = random(-r,r);
            var y = random(-r,r);
            if(X === 0 || Y === 0){
                x = 0;
                y = 0;
            }
            var xv = random(-1,1);
            var yv = random(-1,1);
            grid[X][Y] = {x:x, y:y, vx:xv, vy:yv};
        }
    }
    return {grid:grid, s:s};
};


var n = noiseGen(450, 450, 20, 0);
var grid = n.grid;
var s = n.s;
var Noise = function(x, y){
    for(var X = 0; X < grid.length; X++){
        for(var Y = 0; Y < grid[X].length; Y++){
            var lt = grid[X][Y];
            var lb;
            if(Y < grid[X].length - 1){
                lb = grid[X][Y + 1];
            }
            var rb;
            if(X < grid.length - 1 && Y < grid[X].length - 1){
                rb = grid[X + 1][Y + 1];
            }
            var rt;
            if(X < grid.length - 1){
                rt = grid[X + 1][Y];
            }
            var X1 = X*s + lb.x;
            var Y1 = Y*s + s + lb.y;
            var X2 = X*s + lt.x;
            var Y2 = Y*s + lt.y;
            var X3 = X*s + s + rt.x;
            var Y3 = Y*s + rt.y;
            var X4 = X*s + s + rb.x;
            var Y4 = Y*s + s + rb.y;
            //line(X1, Y1, X1 + lb.vx*20, Y1 + lb.vy*20);
            // line(X1, Y1, X1 + lb.vx*10, Y1 + lb.vy*10);
            // line(X2, Y2, X2 + lt.vx*10, Y2 + lt.vy*10);
            // line(X3, Y3, X3 + rt.vx*10, Y3 + rt.vy*10);
            // line(X4, Y4, X4 + rb.vx*10, Y4 + rb.vy*10);
            if(inBox(x, y, X1, Y1, X2, Y2, X3, Y3, X4, Y4)){
                // stroke(0, 0, 0);
                // ellipse(x, y, 5, 5);
                // line(x, y, X1, Y1);
                 
                // line(x, y, X3, Y3);
                // line(x, y, X4, Y4);
                fill(0, 0, 0);
                // text(percentBetween(x, y, X1, Y1, X2, Y2, X3, Y3, X4, Y4), (X1 + X2 + X3 + X4)/4, (Y1 + Y2 + Y3 + Y4)/4 - 7);
                // text(percentBetween(x, y, X2, Y2, X3, Y3, X1, Y1, X4, Y4), (X1 + X2 + X3 + X4)/4, (Y1 + Y2 + Y3 + Y4)/4 + 7);
                
                var v1 = normalize(lb.vx, lb.vy);
                var v2 = normalize(lt.vx, lt.vy);
                var v3 = normalize(rt.vx, rt.vy);
                var v4 = normalize(rb.vx, rb.vy);
                
                var V1 = {x: percentBetween(x, y, X1, Y1, X2, Y2, X3, Y3, X4, Y4), y:-percentBetween(x, y, X1, Y1, X4, Y4, X2, Y2, X3, Y3)};
                var V2 = {x: percentBetween(x, y, X1, Y1, X2, Y2, X3, Y3, X4, Y4), y:percentBetween(x, y, X2, Y2, X3, Y3, X1, Y1, X4, Y4)};
                var V3 = {x: -percentBetween(x, y, X3, Y3, X4, Y4, X1, Y1, X2, Y2), y:percentBetween(x, y, X2, Y2, X3, Y3, X1, Y1, X4, Y4)};
                var V4 = {x: -percentBetween(x, y, X3, Y3, X4, Y4, X1, Y1, X2, Y2), y:-percentBetween(x, y, X1, Y1, X4, Y4, X2, Y2, X3, Y3)};
                //line(x, y, X4, Y4);
                //text("(" + round(V4.x*1000)/1000 + ", " + round(V4.y*1000)/1000 + ")", x, y);
                
                var leftb = v1.x*V1.x + v1.y*V1.y;
                var leftt = v2.x*V2.x + v2.y*V2.y;
                var rightt = v3.x*V3.x + v3.y*V3.y;
                var rightb = v4.x*V4.x + v4.y*V4.y;
                
                //fill(0, 0, 0);
                //text(round(leftb*100)/100, X1, Y1 - 5);
                //text(round(leftt*100)/100, X2, Y2 - 5);
                //text(round(rightt*100)/100, X3, Y3 - 5);
                //text(round(rightb*100)/100, X4, Y4 - 5);
                var u = poly(percentBetween(x, y, X1, Y1, X2, Y2, X3, Y3, X4, Y4));
                var topVal = interp(leftt, rightt, u);
                var botVal = interp(leftb, rightb, u);
                var midVal = interp(topVal, botVal, poly(percentBetween(x, y, X2, Y2, X3, Y3, X1, Y1, X4, Y4)));
                //fill(0, 0, 0);
            //////text("(" + round(rt.vx*100)/100 + ", " + round(rt.vy*100)/100 + ")", X3, Y3);
                // text(round(topVal*100)/100, (X2 + X3)/2, (Y2 + Y3)/2 - 20);
                // text(round(botVal*100)/100, (X1 + X4)/2, (Y1 + Y4)/2 + 20);
                // text(midVal, (X1 + X2 + X3 + X4)/4, (Y1 + Y2 + Y3 + Y4)/4 + 73);
                return (midVal + 1)/2;
                
            }
            
            
        }
    }
    //return NaN;
};
var xx = 0;
draw = function() {
    if(xx < 400){
        for(var x = xx; x < xx + 5; x += 1){
            for(var y = 0; y < 400;y += 1){
                noStroke();
                stroke(0, 0, 0, Noise(x, y)*255);
                point(x, y);
            }
        }
    xx += 5;
    }
    //     for(var X = 0; X < grid2.length - 1; X++){
    //         for(var Y = 0; Y < grid2[X].length - 1; Y++){
    //             for(var x = xx; x < xx + 20; x++){
    //                 for(var y = 0; y < 600; y++){
    //                     var lt = grid2[X][Y];
                        
    //                     var lb = {x:0, y:0};
    //                     if(Y < grid2[X].length - 1){
    //                         lb = grid2[X][Y + 1];
    //                     }
    //                     var rb = {x:0, y:0};
    //                     if(X < grid2.length - 1 && Y < grid2[X].length - 1){
    //                         rb = grid2[X + 1][Y + 1];
    //                     }
    //                     var rt = {x:0, y:0};
    //                     if(X < grid2.length - 1){
    //                         rt = grid2[X + 1][Y];
    //                     }
    //                     if(inBox(x, y, 
    //         X*50 + lb.x + 50, Y*50 + 50 + lb.y + 50, 
    //         X*50 + lt.x + 50, Y*50 + lt.y + 50, 
    //         X*50 + 50 + rt.x + 50, Y*50 + rt.y + 50, 
    //         X*50 + 50 + rb.x + 50, Y*50 + 50 + rb.y + 50)){
    //                         stroke(X*50, Y*50, 0);
    //                         point(x, y);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     xx += 20;
    // }
    //background(255, 255, 255);
    //text(interp(2, 5, 1.0), 200, 500);
    //var a = normalize(mouseX, mouseY);
    //Noise(mouseX, mouseY);
};
