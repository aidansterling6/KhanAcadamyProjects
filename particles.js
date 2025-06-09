var particleMultiplier = 1;
var parts = [];
var systs = [
            {num: particleMultiplier, t:0, x:300, y:300, dx:-1, dy:-1, rx:0.2, ry:0.2, s:10, vs:0.05},
            {num: particleMultiplier, t:1, x:100, y:300, dx:1, dy:-1, rx:0.2, ry:0.2, s:10, vs:0.05}
];
var drawParts = function(){
    noStroke();
    for(var i = 0; i < parts.length; i++){
        if(parts[i].t === 0){
            fill(255, 0, 0);
        }
        if(parts[i].t === 1){
            fill(0, 0, 255);
        }
        if(parts[i].t === 2){
            fill(160, 0, 160);
        }
        ellipse(parts[i].x, parts[i].y, parts[i].s, parts[i].s);
    }
};
var count = 0;
var updateParts = function(){
    count = 0;
    for(var i = 0; i < parts.length; i++){
        parts[i].x += parts[i].vx;
        parts[i].y += parts[i].vy;
        parts[i].s -= parts[i].vs;
        count++;
    }
    for(var i = 0; i < parts.length; i++){
        for(var o = 0; o < parts.length; o++){
            if(i !== o){
                if(dist(parts[i].x, parts[i].y, parts[o].x, parts[o].y) < parts[i].s + parts[o].s && ((parts[i].t === 0 && parts[o].t === 1) || (parts[i].t === 1 && parts[o].t === 0))){
                    var newdir = {x:(parts[i].vx + parts[o].vx)/2 + random(-0.1, 0.1), y:(parts[i].vy + parts[o].vy)/2 + random(-0.1, 0.1)};
                    parts[i].vx = newdir.x;
                    parts[i].vy = newdir.y;
                    parts[o].vx = newdir.x;
                    parts[o].vy = newdir.y;
                    
                    parts[i].t = 2;
                    parts[o].t = 2;
                    
                }
            }
        }
    }
    for(var i = parts.length - 1; i >= 0; i--){
        if(parts[i].s <= 0){
            parts.splice(i, 1);
        }
    }
};
var updateSysts = function(){
    for(var i = 0; i < systs.length;i++){
        for(var o = 0; o < systs[i].num; o++){
            parts.push({t:systs[i].t, x:systs[i].x, y:systs[i].y, vx:systs[i].dx + random(-systs[i].rx, systs[i].rx), vy:systs[i].dy + random(-systs[i].ry, systs[i].ry), s:systs[i].s, vs:systs[i].vs, c:systs[i].c});
        }
    }
};
draw = function() {
    background(0, 0, 0);
    updateSysts();
    updateParts();
    drawParts();
    fill(255, 255, 255);
    text(count, 200, 350);
};