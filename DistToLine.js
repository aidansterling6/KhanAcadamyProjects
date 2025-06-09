var Line = {x1: 150, y1:130, x2: 240, y2: 100};

function ShortestDistToLine(x, y, x1, y1, x2, y2){
    var a = y1 - y2;
    var b = x2 - x1;
    var c = (x1*y2)-(y1*x2);
    return abs((a*x) + (b*y) + c) / sqrt((a*a) + (b*b));
}

draw = function() {
    background(255, 255, 255);
    stroke(0, 0, 0);
    line(Line.x1, Line.y1, Line.x2, Line.y2);
    fill(0, 0, 0);
    text(ShortestDistToLine(mouseX, mouseY, Line.x1, Line.y1, Line.x2, Line.y2), 200, 200);
};
