//right click to grab, left click to change gravity
var rep = 10;
var nodes = [];
var links = [];
var genLine = function(type,n1,n2,n3,n4,n5){
    if(type === "xy-i"){
        var I = n1;
        var x1 = n2;
        var y1 = n3;
        var num = n4;
        nodes.push({x:x1,y:y1,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: true});
        var tempStart = nodes.length - 1;
        for(var i = 0; i < num;i++){
            nodes.push({x:200 + i*10 + 10,y:0,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: false});
        }
        for(var i = tempStart; i < tempStart + num;i++){
            links.push({i:i,o:i + 1});
        }
        links.push({i:nodes.length - 1,o:I});
    }
    else if(type === "xy-xy"){
        var x1 = n1;
        var y1 = n2;
        var x2 = n3;
        var y2 = n4;
        var num = n5;
        nodes.push({x:x1,y:y1,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: true});
        var tempStart = nodes.length - 1;
        for(var i = 0; i < num;i++){
            nodes.push({x:200 + i*10 + 10,y:0,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: false});
        }
        for(var i = tempStart; i < tempStart + num ;i++){
            links.push({i:i,o:i + 1});
        }
        links.push({i:nodes.length - 1,o:nodes.length});
        nodes.push({x:x2,y:y2,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: true});
    }
    else if(type === "xy-xyf"){
        var x1 = n1;
        var y1 = n2;
        var x2 = n3;
        var y2 = n4;
        var num = n5;
        nodes.push({x:x1,y:y1,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: true});
        var tempStart = nodes.length - 1;
        for(var i = 0; i < num;i++){
            nodes.push({x:200 + i*10 + 10,y:0,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: false});
        }
        for(var i = tempStart; i < tempStart + num ;i++){
            links.push({i:i,o:i + 1});
        }
        links.push({i:nodes.length - 1,o:nodes.length});
        nodes.push({x:x2,y:y2,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: false});
    }
    else if(type === "xy"){
        var x1 = n1;
        var y1 = n2;
        var num = n3;
        nodes.push({x:x1,y:y1,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: true});
        var tempStart = nodes.length - 1;
        for(var i = 0; i < 50;i++){
            nodes.push({x:200 + i*10 + 10,y:0,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: false});
        }
        for(var i = tempStart; i < tempStart + num;i++){
            links.push({i:i,o:i + 1});
        }
    }
    else if(type === "i-o"){
        var I = n1;
        var O = n2;
        var num = n3;
        var m = n4;
        var tempStart = nodes.length;
        links.push({i:nodes.length,o:O});
        for(var i = 0; i < num;i++){
            nodes.push({x:200 + i*10 + 10,y:0,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:m,locked: false});
        }
        for(var i = tempStart; i < tempStart + num - 1;i++){
            links.push({i:i,o:i + 1});
        }
        links.push({i:nodes.length - 1,o:I});
    }
    else if(type === "i"){
        var I = n1;
        var num = n2;
        var tempStart = nodes.length;
        for(var i = 0; i < num;i++){
            nodes.push({x:200 + i*10 + 10,y:0,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:1,locked: false});
        }
        for(var i = tempStart; i < tempStart + num - 1;i++){
            links.push({i:i,o:i + 1});
        }
        links.push({i:nodes.length - 1,o:I});
    }
};
nodes.push({x:200,y:200,vx:0,vy:0,ax:0,ay:0,fx:0,fy:0,m:100,locked: false});
var radius = 348;
for(var a = 0; a < 360;a += 20){
genLine("xy-i",0,300 + cos(a)*radius,300 + sin(a)*radius,40);
}

var end = nodes.length;
for(var l = 4;l < 38;l += 7){
var start = l;
var gain = 41;
var E = 0;
for(var i = start;i < end;i += gain){
    if(i + gain < end){
        genLine("i-o",i,i + gain,40-l,1);
        E = i;
    }
}
genLine("i-o",E + gain,start,40-l,1);
}
var k = 2/rep;
var l = 1;
var drag = 0.05/rep;
var gravity = {x:0,y:0.1};
var spring = function(x,y,tx,ty,k,l){
    var td = dist(x,y,tx,ty);
    var d = l - td;
    if(td !== 0){
        return({x:((x-tx)/td)*(k*d),y:((y-ty)/td)*(k*d)});
    }
    return{x:0,y:0};
};
var Draw = function(){
    for(var i = 0; i < links.length;i++){
        if((links[i].i + 32)%42 === 0){
            //ellipse(nodes[links[i].i].x,nodes[links[i].i].y,5,5);
        }
        line(nodes[links[i].i].x,nodes[links[i].i].y,nodes[links[i].o].x,nodes[links[i].o].y);
    }
};
var update = function(){
for(var i = 0; i < nodes.length;i++){
    nodes[i].vx *= (1-drag);
    nodes[i].vy *= (1-drag);
    nodes[i].fx = 0;
    nodes[i].fy = 0;
    nodes[i].ax = gravity.x/rep;
    nodes[i].ay = gravity.y/rep;
}
for(var i = 0; i < links.length;i++){
    var ni = nodes[links[i].i];
    var no = nodes[links[i].o];
    var fi = spring(ni.x,ni.y,no.x,no.y,k,l);
    var fo = spring(no.x,no.y,ni.x,ni.y,k,l);
    nodes[links[i].i].fx += fi.x;
    nodes[links[i].i].fy += fi.y;
    nodes[links[i].o].fx += fo.x;
    nodes[links[i].o].fy += fo.y;
}
for(var i = 0; i < nodes.length;i++){
    nodes[i].ax += nodes[i].fx/nodes[i].m;
    nodes[i].ay += nodes[i].fy/nodes[i].m;
    nodes[i].vx += nodes[i].ax;
    nodes[i].vy += nodes[i].ay;
    if(!nodes[i].locked){
    nodes[i].x += nodes[i].vx;
    nodes[i].y += nodes[i].vy;
    }
}
};
var s = 0.8;
draw = function() {
    pushMatrix();
    translate(300,300);
    scale(s,s);
    translate(-300,-300);
    background(255, 255, 255);
    for(var t = 0; t < rep;t++){
        update();
    }
    Draw();
    nodes[0].locked = false;
    if(mouseIsPressed && mouseButton === LEFT){
        gravity.x = (mouseX - 300)/2000;
        gravity.y = (mouseY - 300)/2000;
    }
    else if(mouseIsPressed && mouseButton === RIGHT){
        nodes[0].x = ((mouseX - 300)*(1/s)) + 300;
        nodes[0].y = ((mouseY - 300)*(1/s)) + 300;
        nodes[0].locked = true;
    }
    else{
        gravity = {x:0,y:0.1};
    }
    popMatrix();
};
