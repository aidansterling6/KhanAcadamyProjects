var drawPalmLeaf = function(x, y, angle){
    var dx = cos(angle-90)*4/1.5;
    var dy = sin(angle-90)*3/1.5;
    noStroke();
    var Rand = random(0, 1000);
    for(var i = 0; i < 30; i++){
        var tmp = random(-20,0);
        fill(0 + tmp,157 + tmp,79 + tmp);
        x += dx;
        y += dy;
        dy += 0.15/1.5;
        var n = noise(Rand + i/7)*2;
        //ellipse(x, y, 30*(1-i/40), 30*(1-i/40));
        strokeWeight(3);
        stroke(0 + tmp,157 + tmp,79 + tmp);
        for(var t = 0; t < 5; t++){
        var a = random(-45, 45);
        line(x, y, x + (dx + random(-0.6, 0.6))*15, y + (dy + random(-0.6, 0.6))*15);
        }
    }
};
var drawPalmTree = function(x, y){
    ellipse(x, y, 15, 15);
    var angle = random(-2, 2);
    var deltaAngle = -angle * random(0, 1);
    noStroke();
    var s = 10;
    for(var i = 0; i < 30; i++){
        s = 10*(1-i/30) + 20;
        var tmp =  + random(-20,0);
        fill(185 + tmp,157 + tmp,79 + tmp);
        x += cos(angle-90)*10;
        y += sin(angle-90)*10;
        angle += deltaAngle;
        ellipse(x, y, s, s*(2/3));
    }
    var tmp = random(-20,0);
    fill(0 + tmp,157 + tmp,79 + tmp);
    ellipse(x, y, 15, 20);
    for(var i = 0; i < 10; i++){
        drawPalmLeaf(x, y, random(0,360));
    }
    
};
drawPalmTree(300, 600);