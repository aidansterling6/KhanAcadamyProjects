var angle = 45;

var getRotation = function(sx, sy){
    
    var d = dist(0, 0, sx - 0.5, sy - 0.5);
    var tmpAngle = atan2(sy - 0.5, sx - 0.5);
    
    
    return {x:cos(tmpAngle + angle)*d, y:sin(tmpAngle + angle)*d};
};
var drawGrid = function(x, y, w, h){
    var tmpsx = 0.1;
    var tmpsy = 0.1;
    
    
    for(var xs = 0; xs < 1 - tmpsx; xs += tmpsx){
        for(var ys = 0; ys < 1 - tmpsy; ys += tmpsy){
            var p1 = getRotation(xs, ys);
            var p2 = getRotation(xs + tmpsx, ys);
            var p3 = getRotation(xs + tmpsx, ys + tmpsy);
            var p4 = getRotation(xs, ys + tmpsy);
            quad(
                x + (p1.x*w),
                y + (p1.y*h),
                x + (p2.x*w),
                y + (p2.y*h),
                x + (p3.x*w),
                y + (p3.y*h),
                x + (p4.x*w),
                y + (p4.y*h)
                );
        }
    }
};
draw = function() {
    background(237, 237, 237);
    //angle = (mouseX/600)*360;
    drawGrid(300, 300, 200, 200);
    fill(0, 0, 0);
    text("" + 0.1 + ", " + 0.2 + ", " + angle, 300, 500);
    var p = getRotation(0.1, 0.2);
    text("" + p.x + ", " + p.y, 300, 500 + 15);
};