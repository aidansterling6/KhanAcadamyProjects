//click to move lazer, use mouse to aim it
var lazers = [];
//lines for mirr
var mirrors = [{x1:0,y1:400,x2:400,y2:400}, {x1:335,y1:176,x2:354,y2:57}, {x1:335,y1:176,x2:255,y2:303}, {x1:227,y1:144,x2:354,y2:57}, {x1:227,y1:144,x2:287,y2:182}, {x1:227,y1:309,x2:287,y2:182}, {x1:0,y1:0,x2:440,y2:0}, {x1:29,y1:219,x2:140,y2:205}, {x1:29,y1:219,x2:88,y2:105}, {x1:88,y1:105,x2:140,y2:205}, {x1:192,y1:242,x2:273,y2:205}];

var dot = function(line1, line2){
    var a1 = line1.y2 - line1.y1;
    var a2 = line1.x2 - line1.x1;
    var b1 = line2.y2 - line2.y1;
    var b2 = line2.x2 - line2.x1;
    return a1*b1 + a2*b2;
};
var Dist = function(line){
    return dist(line.x1, line.y1, line.x2, line.y2);
};
var angle = function(line1, line2){
    return acos(dot(line1, line2)/(Dist(line1)*Dist(line2)));
};
var findIntersect = function(line1, line2){
    var output = {failed:false, x:0, y:0, col: false};
    if(line1.x1 === line1.x2 && line2.x1 === line2.x2){
        output.failed = true;
        return output;
    }
    var s1;
    var s2;
    var X;
    var Y;
    if(line1.x1 !== line1.x2 && line2.x1 === line2.x2){
        X = line2.x1;
        s1 = (line1.y2 - line1.y1)/(line1.x2 - line1.x1);
        Y = s1*(X - line1.x1) + line1.y1;
    } else if(line1.x1 === line1.x2 && line2.x1 !== line2.x2){
        X = line1.x1;
        s2 = (line2.y2 - line2.y1)/(line2.x2 - line2.x1);
        Y = s2*(X - line2.x1) + line2.y1;
    } else{
        s1 = (line1.y2 - line1.y1)/(line1.x2 - line1.x1);
        s2 = (line2.y2 - line2.y1)/(line2.x2 - line2.x1);
        if(s1 === s2){
            output.failed = true;
            return output;
        }
        X = (line2.y1 + s1*line1.x1 - line1.y1 - s2*line2.x1)/(s1-s2);
        Y = s1*(X - line1.x1) + line1.y1;
    }
    noStroke();
    fill(0, 0, 0);
    output.x = X;
    output.y = Y;
    if(dist(line2.x1, line2.y1, output.x, output.y) <= dist(line2.x1, line2.y1, line2.x2, line2.y2) && dist(line2.x2, line2.y2, output.x, output.y) <= dist(line2.x1, line2.y1, line2.x2, line2.y2)){
        //==ellipse(X, Y, 10, 10);
        output.col = true;
    }
    return output;
};
var rotateAround = function(a, x1, y1, x2, y2, m, len){
    //ellipse(x1, y1, 5,5);
    var A = angle({x1:x1, y1:y1, x2:x1 + 20, y2:y1}, {x1:x1, y1:y1, x2:x2, y2:y2});
    A += m;
    A += a;
    if(y2 < y1){
        A = -A + 180;
    }
    //var d = dist(x1,y1,x2,y2);
    return{x1:x1, y1:y1, x2:x1 + cos(A)*len, y2:y1 + sin(A)*len};
};
var flip = function(line1, x, y){
    var out = {x:x,y:y};
    if(line1.x1 === line1.x2){
        out.x = line1.x1 + (line1.x1 - x);
        return out;
    }
    //line(x, y, x + (line1.y1 - line1.y2), y + (line1.x2 - line1.x1));
    var int = findIntersect({x1:x, y1:y, x2: x + (line1.y1 - line1.y2), y2:y + (line1.x2 - line1.x1)}, line1);
    var d = dist(x, y, x + (line1.y1 - line1.y2), y + (line1.x2 - line1.x1));
    var d2 = dist(x, y, int.x, int.y);
    out.x = x + d2*2*(line1.y1 - line1.y2)/d;
    out.y = y + d2*2*(line1.x2 - line1.x1)/d;
    var slope = (line1.y2 - line1.y1)/(line1.x2 - line1.x1);
    if(!(out.y > slope*(out.x - line1.x1) + line1.y1 && y > slope*(x - line1.x1) + line1.y1)){
        return out;
    }
    out.x = x - d2*2*(line1.y1 - line1.y2)/d;
    out.y = y - d2*2*(line1.x2 - line1.x1)/d;
    return out;
    
};
var reflect = function(line1, line2){
    var output = {failed:false, x1:0, y1:0, x2:0, y2:0};
    var pos = findIntersect(line1, line2);
    if(pos.failed || pos.col === false){
        output.failed = true;
        return output;
    }
    if(dist(line1.x1, line1.y1, pos.x, pos.y) === 0){
        output.failed = true;
        return output;
    }
    if(dot(line1, {x1:line1.x1, y1:line1.y1, x2:pos.x, y2:pos.y}) <= 0){
        output.failed = true;
        return output;
    }
    //var Angle = angle(line1, line2);
    //text(Angle, 200, 245);
    //if(line2.x1 === line2.x2){
        //output.failed = true;
        //return output;
    //}
    //var slope = {x:(line2.x2 - line2.x1)/Dist(line2), y:(line2.y2 - line2.y1)/Dist(line2)};
    //var scaler = -49;
    //ellipse(pos.x + slope.x*scaler, pos.y + slope.y * scaler, 5, 5);
    //if(findIntersect(line2, line1).col){
    //    Angle *= -1;
    //}
    //var rot1 = rotateAround(Angle*2 + 180,pos.x, pos.y, line1.x2, line1.y2, 0, 30);
    //var rot2 = rotateAround(Angle*2 + 180,pos.x, pos.y, line1.x2, line1.y2, 180, 30);
    //stroke(0, 0, 0);
    //var sl = (line2.y2 - line2.y1)/(line2.x2 - line2.x1);
    
    //if(rot1.y2 > sl*(rot1.x2-line2.x1)+line2.y1 && line1.y1 > sl*(line1.x1-line2.x1)+line2.y1){
    //    strokeWeight(3);
    //    //line(rot1.x1, rot1.y1, rot1.x2, rot1.y2);
    //    strokeWeight(1);
    ///    output.x2 = rot1.x2;
    //    output.y2 = rot1.y2;
    //} else{
    //    strokeWeight(2);
        //line(rot2.x1, rot2.y1, rot2.x2, rot2.y2);
    //    strokeWeight(1);
    //    output.x2 = rot2.x2;
    //    output.y2 = rot2.y2;
    //}
    //line(rot1.x1, rot1.y1, rot1.x2, rot1.y2);
    //line(rot2.x1, rot2.y1, rot2.x2, rot2.y2);
    //var slope2 = (line1.y2 - line1.y1)/(line1.x2 - line1.x1);
    var D = dist(pos.x, pos.y, line1.x1, line1.y1);
    //line(pos.x, pos.y, pos.x + 40*(pos.x - line1.x1)/D, pos.y + 40*(pos.y - line1.y1)/D);
    var f = flip(line2, pos.x + 40*(pos.x - line1.x1)/D, pos.y + 40*(pos.y - line1.y1)/D);
    //ellipse(f.x, f.y, 50, 50);
    //text(acos(dot(line1, rot2)/(Dist(line1)*Dist(rot2))), 200, 200);
    output.x2 = f.x;
    output.y2 = f.y;
    output.x1 = pos.x;
    output.y1 = pos.y;
    
    //line(output.x1, output.y1, output.x2, output.y2);
    //ellipse(pos.x, pos.y,50,50);
    return output;
    
};
var drawMirrors = function(){
    for(var i = 0; i < mirrors.length;i++){
        strokeWeight(2);
        stroke(145, 145, 145);
        line(mirrors[i].x1, mirrors[i].y1, mirrors[i].x2, mirrors[i].y2);
        strokeWeight(1);
    }
};
var lazer = function(){
    for(var i = 0; i < lazers.length;i++){
        var minDist = -1;
        var firstBounce = {x1:114, y1:1, x2:114, y2:1, o:0};
        for(var o = 0; o < mirrors.length;o++){
            var temp = reflect(lazers[i], mirrors[o]);
            var temp2 = findIntersect(lazers[i], mirrors[o]);
            //ellipse(temp2.x, temp2.y,15,15);
            //text(temp.failed, temp2.x + 20, temp2.y);
            if(temp.failed === false && dist(temp.x1, temp.y1, lazers[i].x1, lazers[i].y1) > 0.01 && (dist(temp.x1, temp.y1, lazers[i].x1, lazers[i].y1) < minDist || minDist === -1)){
                firstBounce = temp;
                firstBounce.o = o;
                minDist = dist(temp.x1, temp.y1, lazers[i].x1, lazers[i].y1);
            }
        }
        //ellipse(firstBounce.x1, firstBounce.y1,5,5);
            if(dist(firstBounce.x1, firstBounce.y1, mirrors[firstBounce.o].x2, mirrors[firstBounce.o].y2) < 0.1 || dist(firstBounce.x1, firstBounce.y1, mirrors[firstBounce.o].x1, mirrors[firstBounce.o].y1) < 0.1){
                lazers[i].bounces = 0;
                //ellipse(firstBounce.x, firstBounce.y,50,50);
            }
        //ellipse(firstBounce.x1, firstBounce.y1,5,5);
        //text(dist(firstBounce.x1, firstBounce.y1, lazers[i].x1, lazers[i].y1), 91, 118 +i*20);
        if(minDist !== -1){
            lazers[i].x3 = firstBounce.x1;
            lazers[i].y3 = firstBounce.y1;
            stroke(255, 0, 0);
            //line(firstBounce.x1, firstBounce.y1, firstBounce.x2, firstBounce.y2);
            if(lazers[i].bounces > 0){
            lazers.push({x1:firstBounce.x1, y1:firstBounce.y1, x2:firstBounce.x2, y2:firstBounce.y2, x3:0, y3:0, bounces: lazers[i].bounces - 1});
            }
        }else if(minDist === -1){
            lazers[i].x3 = (lazers[i].x2 - lazers[i].x1)*1000000;
            lazers[i].y3 = (lazers[i].y2 - lazers[i].y1)*1000000;
        }
        
    }
    for(var i = 0; i < lazers.length;i++){
        strokeWeight(1);
        if(255/(201-lazers[i].bounces) !== 0){
        stroke(255, 0, 0, (255/(201-lazers[i].bounces))/100);
        } else{
            stroke(255, 0, 0);
        }
        line(lazers[i].x1, lazers[i].y1, lazers[i].x3, lazers[i].y3);
        //text(255/(201-lazers[i].bounces), (lazers[i].x1 + lazers[i].x2)/2, (lazers[i].y1 + lazers[i].y2)/2);
        strokeWeight(1);
    }
    lazers = [];
};
var lazerSpawn = function(x1, y1, x2, y2, bounces){
    lazers.push({x1:x1, y1:y1, x2:x2, y2:y2, x3:0, y3:0, bounces: bounces});
};
var Xpos = 185;
var Ypos = 200;
var Xpos2 = 200;
var Ypos2 = 200;
draw = function() {
    //fill(255, 255, 255, 1);
    //rect(0,0,400,400);
    for(var t = 0; t < 1000; t++){
    drawMirrors();
    if(mouseIsPressed){
        background(255, 255, 255);
        Xpos = mouseX + 0.0001;
        Ypos = mouseY;
    } else{
        //Xpos2 = mouseX;
        //Ypos2 = mouseY;
        Xpos2 = random(0,40000)/100;
        Ypos2 = random(0,40000)/100;
        lazerSpawn(Xpos, Ypos, Xpos2, Ypos2, 200);
    }
    lazer();
    }
};
