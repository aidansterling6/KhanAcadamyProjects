var delayTimeS = 20;
var delayTime = 0;
var dragging = true;
var gapLen = 10;
var pixelDensity = 20;


var compare = function(shape1, shape2, diff){

};
var shapes = [];
var drawPointAlongLine = function(x1, y1, x2, y2, len){
    stroke(0, 0, 0);
    //fill(0, 0, 0);
    var Dist = dist(x1, y1, x2, y2);
    ellipse(x1 + (x2-x1)/Dist*len, y1 + (y2-y1)/Dist*len, 4, 4);
};
var lenPerPixelG = 0;
var getNormals = function(shape, pixels){
    var sections = [];
    var totalLen = 0;
    if(shape.length > 1){
    for(var i = 0; i < shape.length - 1; i++){
        var sx = (shape[i+1].x-shape[i].x);
        var sy = (shape[i+1].y-shape[i].y);
        if(sx === 0){
            sx = 0.0000001;
        }
        var length = dist(shape[i + 1].x, shape[i + 1].y, shape[i].x, shape[i].y);
        totalLen += length;
        sections.push({sx: sx, sy: sy, len: length});
    }
    var lenPerPixel = totalLen/pixels;
    lenPerPixelG = lenPerPixel;
    var out = [];
    var index = 0;
    var distLeft = lenPerPixel;
    var distGone = 0;
    var lastSlopex = 1;
    var lastSlopey = 1;
    for(var i = 0; i < pixels; i++){
        distLeft = lenPerPixel;
        var totalx = 0;
        var totaly = 0;
        var count = 0;
        distGone += lenPerPixel;
        while(true){
            //ellipse(mouseX, mouseY, 5,5);
            var diff = 0;
            if(index >= 0 && index < sections.length){
                diff = sections[index].len - distGone;
            }
            if(index >= 0 && index < sections.length && distGone >= sections[index].len){
                distGone -= sections[index].len;
                distLeft -= abs(diff);
                totalx += sections[index].sx;
                lastSlopex = sections[index].sx;
                totaly += sections[index].sy;
                lastSlopey = sections[index].sy;
                count++;
                index++;
            } else if(index >= 0 && index < sections.length){
                totalx += sections[index].sx;
                lastSlopex = sections[index].sx;
                totaly += sections[index].sy;
                lastSlopey = sections[index].sy;
                count++;
                if(index < shape.length - 1){
                    fill(0, 0, 0);
                    //drawPointAlongLine(shape[index].x, shape[index].y, shape[index + 1].x, shape[index + 1].y, distGone);
                }
                break;
            } else {
                totalx += lastSlopex;
                totaly += lastSlopey;
                count++;
                break;
            }
        }
        out.push({x: totalx/count, y: totaly/count});
    }
    return out;
    }
    return [];
};
var getDeltaNormals = function(normals){
    var out = [];
    for(var i = 0; i < normals.length - 1; i++){
        out.push({x: normals[i + 1].x - normals[i].x, y: normals[i + 1].y - normals[i].y});
    }
    return out;
};
var currentShape = [];
var lastPoint = {x:0, y:0};
var currentNormals = [];
var currentDeltaNormals = [];
var draw = function() {
    background(255, 255, 255);
    if(!mouseIsPressed){
        dragging = false;
    }
    if(mouseIsPressed && delayTime < 0){
        if(dragging === false){
            lastPoint.x = mouseX;
            lastPoint.y = mouseY;
            currentShape = [];
            currentShape.push({x:lastPoint.x, y:lastPoint.y});
        }
        dragging = true;
        delayTime = delayTimeS;
    }
    if(dragging && dist(mouseX, mouseY, lastPoint.x, lastPoint.y) > gapLen){
        lastPoint.x = mouseX;
        lastPoint.y = mouseY;
        currentShape.push({x:lastPoint.x, y:lastPoint.y});
    }
    for(var i = 0; i < currentShape.length - 1; i++){
        stroke(0, 0, 255);
        strokeWeight(15);
        line(currentShape[i].x, currentShape[i].y, currentShape[i + 1].x, currentShape[i + 1].y);
    }
    currentNormals = getNormals(currentShape, pixelDensity*currentShape.length);
    if(currentShape.length > 0){
    var x = currentShape[0].x;
    var y = currentShape[0].y;
    for(var i = 0; i < currentNormals.length; i++){
        var tx = x;
        var ty = y;
        x += currentNormals[i].x/dist(0, 0, currentNormals[i].x, currentNormals[i].y)*lenPerPixelG;
        y += currentNormals[i].y/dist(0, 0, currentNormals[i].x, currentNormals[i].y)*lenPerPixelG;
        strokeWeight(8);
        stroke(255, 0, 0);
        line(tx, ty, x, y);
    }
    }
    currentDeltaNormals = getDeltaNormals(currentNormals);
    if(currentShape.length > 0 && currentNormals.length > 0){
    var x = currentShape[0].x;
    var y = currentShape[0].y;
    var nx = currentNormals[0].x;
    var ny = currentNormals[0].y;
    for(var i = 0; i < currentDeltaNormals.length; i++){
        var tx = x;
        var ty = y;
        nx += currentDeltaNormals[i].x;
        ny += currentDeltaNormals[i].y;
        x += nx/dist(0, 0, currentNormals[i].x, currentNormals[i].y)*lenPerPixelG;
        y += ny/dist(0, 0, currentNormals[i].x, currentNormals[i].y)*lenPerPixelG;
        strokeWeight(3);
        stroke(0, 255, 0);
        line(tx, ty, x, y);
    }
    }
    delayTime--;
};