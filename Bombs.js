var numBombs = 20;
var sensorSize = 20;
var BoardWidth = 400;
var BoardHeight = 400;
var clickDelay = 20;




textAlign(CENTER, CENTER);
var clickTimer = 0;
var bombs = [];
var flags = [];
for(var i = 0; i < numBombs; i++){
    bombs.push({x:random(0, BoardWidth), y:random(0, BoardHeight)});
}



var test = function(x, y, Dist){
    var num = 0;
    for(var i = 0; i < bombs.length;i++){
        if(dist(x, y, bombs[i].x, bombs[i].y) < Dist){
            num++;
        }
    }
    return num;
};


var sensor = [];

var sensors = function(){
    for(var i = 0; i < sensor.length; i++){
        noFill();
        stroke(0, 0, 0, 100);
        ellipse(sensor[i].x, sensor[i].y, sensorSize*2, sensorSize*2);
        fill(0, 0, 0);
        textSize(10);
        text(test(sensor[i].x, sensor[i].y, sensorSize), sensor[i].x, sensor[i].y);
    }
};
var flag = function(){
    for(var i = 0; i < flags.length; i++){
        fill(255, 255, 255);
        noStroke();
        ellipse(flags[i].x, flags[i].y, 2, 2);
    }
};

var draw = function() {
    background(3, 179, 0);
    textSize(12);
    fill(0, 0, 0);
    text(test(mouseX, mouseY, sensorSize), 200, 200);
    if(mouseIsPressed && mouseButton === LEFT && clickTimer < 0){
        sensor.push({x:mouseX, y:mouseY});
        clickTimer = clickDelay;
    }
    if(mouseIsPressed && mouseButton === RIGHT && clickTimer < 0){
        flags.push({x:mouseX, y:mouseY});
        clickTimer = clickDelay;
    }
    noFill();
    ellipse(mouseX, mouseY, sensorSize*2, sensorSize*2);
    if(keyIsPressed){
        for(var i = 0; i < bombs.length;i++){
            fill(0, 0, 0);
            ellipse(bombs[i].x, bombs[i].y, 5, 5);
        }
    }
    sensors();
    flag();
    clickTimer--;
};