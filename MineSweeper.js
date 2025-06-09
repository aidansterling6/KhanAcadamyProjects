/* 
    I've been programming 5 years, and I have learned 100% of Intro to JS.
    I would prefer to be placed in the Advanced bracket.
    TODO: Fill that out ^
    
    TODO: Remove starter code below.
*/
//important: if you want change variables, change them both up here and inthe reset if statement on line 173

//each revealed square has the number of mines next to it written on it (up to 8). your goal is to place flags on the mines and place a none-flag on everything else.

//var trr = 0;
var controlType = "button control";
var sctime = 10;
var ctime = 0;
//change to true to activate ai
var showFlagged = false;
var flagged = 0;
var safeSpace = 100;
var showSafeSpace = false;
var ai = false;
var aiTimeS = 1;
var aiTime = 20;
var aifl = 50;
var bbutton = false;
var ubutton = false;
var scx = 0;
var scy = 0;
//variable/function creation
if(true){
var timeToClick = 50;

var clicked = false;
//starting time
var startTime = 200;
//reset timer
var time = startTime;
//weather the game resets or not
var reset = false;
//how big each box is
var boxSize = 20;
//number of mines (50 is good)
var numMines = 100; //15
//weather you lost or not
var lose = false;
//stores Boxes
var Box = [];
//creats all Boxes and stores them in Box
for(var x = 0; x < 600;x+= boxSize){
    for(var y = boxSize*5; y < 600;y += boxSize){
        Box.push({x:x,y:y,b:false,c:true,n:0,f:false,num:0,numf:0});
    }
}
//runs through all Boxes
var grid = function(){
for(var i = 0; i < Box.length;i++){
    if(ubutton && mouseX > Box[i].x && mouseX < Box[i].x + boxSize && mouseY > Box[i].y && mouseY < Box[i].y + boxSize){
        if(Box[i].b === true){
            lose = true;
        }
        Box[i].f = false;
        Box[i].c = false;
    }
        if(bbutton && mouseX > Box[i].x && mouseX < Box[i].x + boxSize && mouseY > Box[i].y && mouseY < Box[i].y + boxSize){
            Box[i].f = true;
    }
    Box[i].n = 0;
    Box[i].num = 0;
    Box[i].numf = 0;
    for(var o = 0;o < Box.length;o++){
        if(dist(Box[i].x,Box[i].y,Box[o].x,Box[o].y) <= sqrt(boxSize*boxSize*2) && i !== o && Box[o].b === true){
            Box[i].n++;
        }
        if(ai === true && aiTime < 0 && dist(Box[i].x,Box[i].y,Box[o].x,Box[o].y) <= sqrt(boxSize*boxSize*2) && i !== o && Box[o].c === true){
            Box[i].num++;
        }
        if(ai === true && aiTime < 0 && dist(Box[i].x,Box[i].y,Box[o].x,Box[o].y) <= sqrt(boxSize*boxSize*2) && i !== o && Box[o].f === true){
            Box[i].numf++;
        }
    }
    if(ai === true && aiTime < 0 && Box[i].num === Box[i].n){
        //aifl = 50;
        //aiTime = aiTimeS;
        for(var o = 0; o < Box.length;o++){
            if(dist(Box[i].x,Box[i].y,Box[o].x,Box[o].y) <= sqrt(boxSize*boxSize*2) && i !== o && Box[i].c === false && Box[o].c === true && Box[i].n > 0 && Box[o].f === false){
                Box[o].f = true;
                aiTime = aiTimeS;
            }
        }
    }
    if(ai === true && aiTime < 0 && Box[i].numf === Box[i].n){
        //aifl = 50;
        for(var o = 0; o < Box.length;o++){
            if(dist(Box[i].x,Box[i].y,Box[o].x,Box[o].y) <= sqrt(boxSize*boxSize*2) && i !== o && Box[o].f === false && Box[o].c === true && Box[i].n > 0){
                Box[o].c = false;
                aiTime = aiTimeS;
            }
        }
    }
    for(var o = 0; o < Box.length;o++){
        if(Box[o].c === true && dist(Box[i].x,Box[i].y,Box[o].x,Box[o].y) <= dist(boxSize,boxSize,0,0) && i !== o && Box[i].c === false && Box[i].n === 0){
            Box[o].c = false;
        }
    }
    fill(212, 212, 212);
    stroke(99, 99, 99);
    rect(Box[i].x,Box[i].y,boxSize,boxSize);
    if(Box[i].b === true){
        fill(0, 0, 0);
        rect(Box[i].x,Box[i].y,boxSize,boxSize);
    }
    if(Box[i].c !== false && Box[i].f === false){
        stroke(84, 84, 84);
        fill(110, 110, 110);
        rect(Box[i].x,Box[i].y,boxSize,boxSize);
        noStroke();
        fill(166, 166, 166);
        rect(Box[i].x + (boxSize/10) + 1,Box[i].y + (boxSize/10) + 1,boxSize*0.8 - 1,boxSize*0.8 - 1);
    }
    if(Box[i].f === true){
        if(Box[i].b){
            flagged++;
        }
        fill(212, 212, 212);
        rect(Box[i].x,Box[i].y,boxSize,boxSize);
        fill(255, 0, 0);
        stroke(255, 0, 0);
        triangle(Box[i].x + (boxSize/2),Box[i].y + (boxSize/2) + 1,Box[i].x + (boxSize/2),Box[i].y - 6 + (boxSize/2),Box[i].x + (boxSize/2) + 6,Box[i].y + (boxSize/2) + -2.5);
        stroke(0, 0, 0);
        strokeWeight(2);
        line(Box[i].x + (boxSize/2),Box[i].y + (boxSize/2) + 5,Box[i].x + (boxSize/2),Box[i].y - 6 + (boxSize/2));
        strokeWeight(1);
        stroke(0, 0, 0);
    }
    if(Box[i].c === false && Box[i].b === false && Box[i].f === false && Box[i].n !== 0){
    if(Box[i].n === 1){
        fill(0, 0, 255);
    }
    else if(Box[i].n === 2){
        fill(0, 112, 0);
    }
    else if(Box[i].n === 3){
        fill(255, 0, 0);
    }
    else if(Box[i].n === 4){
        fill(5, 0, 92);
    }
    else if(Box[i].n === 5){
        fill(92, 37, 0);
    }
    else if(Box[i].n === 6){
        fill(112, 0, 120);
    }
    else if(Box[i].n === 7){
        fill(255, 102, 0);
    }
    else{
        fill(255, 0, 255);
    }
    text(Box[i].n,Box[i].x + (boxSize/2),Box[i].y + (boxSize/2));
    }
}
};
//weather you won or not
var win = false;
//number of mines
var num = 0;
}
var cli = 0;
//draw loop
draw = function() {
    flagged = 0;
    timeToClick--;
    background(255, 255, 255);
    if(reset === false){
    //set text size and align
textSize(17);
textAlign(CENTER,CENTER);
    //checks if their are enough mines
    if(mouseIsPressed && mouseY >= 200 && timeToClick <= 0){
        clicked = true;
    }
    while(clicked && num < numMines){
        background(87, 87, 87);
        fill(0, 0, 0);
        text("LOADING",300,300);
    var i = 0;
    i = round(random(0,Box.length - 1));
    if(dist(Box[i].x + (boxSize/2),Box[i].y + (boxSize/2),mouseX,mouseY) > safeSpace){
    Box[i].b = true;
    }
    num = 0;
    for(var t = 0; t < Box.length;t++){
        if(Box[t].b === true){
            num++;
        }
    }
    }
    if(num < numMines){
    
    }
    //lose screen
    else if(lose === true){
        time--;
        if(time <= 0){
            reset = true;
            lose = false;
            //Program.restart();
        }
        background(0, 0, 0);
        fill(156, 156, 156);
        textSize(50);
        text("YOU LOSE",300,300);
    }
    //win screen
    else if(win === true){
        background(0, 0, 0);
        time--;
        if(time <= 0){
            reset = true;
            //Program.restart();
            win = false;
        }
        fill(156, 156, 156);
        textSize(50);
        text("YOU WIN",300,300);
    }
    //game screen
    else{
        //resets background to white every frame
    background(255, 255, 255);
    stroke(0, 0, 0);
    noFill();
    //ellipse(300,100,30,30);
    /*if(cli === 0){
        line(300 - 11,100 - 11,300 + 11,100 + 11);
    }*/
    /*
        fill(255, 0, 0);
        stroke(255, 0, 0);
        triangle(300,100 + 1,300,100 - 6,300 + 6,100 + -2.5);
        stroke(0, 0, 0);
        strokeWeight(2);
        line(300,100 + 5,300,100 - 6);
        strokeWeight(1);
        stroke(0, 0, 0);
    */
    strokeWeight(1);
    bbutton = false;
    ubutton = false;
    if(mouseIsPressed && dist(mouseX,mouseY,100,50) < 50){
        cli = 0;
    }
    if(mouseIsPressed && dist(mouseX,mouseY,500,50) < 50){
        cli = 1;
    }
    if((((cli === 0 && controlType === "button control") || (mouseButton === LEFT && controlType === "mouse control"))) && mouseIsPressed){
    bbutton = false;
    ubutton = true;
    }
    else if(((cli === 1 && controlType === "button control") || (mouseButton === RIGHT && controlType === "mouse control")) && mouseIsPressed){
    bbutton = true;
    ubutton = false;
    }
    if(controlType === "button control"){
if(mouseIsPressed && dist(mouseX,mouseY,75,70) < 50){
    cli = 0;
}
else if(mouseIsPressed && dist(mouseX,mouseY,325,70) < 50){
    cli = 1;
}
fill(255, 255, 255);
ellipse(75,50,100,100);
ellipse(525,50,100,100);
fill(0, 0, 0);
text("flag",525,50);
text("no flag",75,50);
stroke(0, 0, 0);
    noFill();
    ellipse(300,130,30,30);
    if(cli === 0){
        line(300 - 11,130 - 11,300 + 11,130 + 11);
    }
        fill(255, 0, 0);
        stroke(255, 0, 0);
        triangle(300,130 + 1,300,130 - 6,300 + 6,130 + -2.5);
        stroke(0, 0, 0);
        strokeWeight(2);
        line(300,130 + 5,300,130 - 6);
}
/*
    noStroke();
    fill(173, 173, 173);
    ellipse(100,100,100,100);
    fill(0, 0, 0);
    text("no flag",100,100);
    fill(173, 173, 173);
    ellipse(500,100,100,100);
    fill(0, 0, 0);
    text("flag",500,100);
    */
    //calls grid function
    grid();
    //if(aifl < 0){
        //Box[round(random(0,Box.length - 1))].c = false;
    //}
    //flag variable for checking if you won
    var flagW = false;
    //runs through all boxes to check if you won
    for(var i = 0; i < Box.length;i++){
        if(!((Box[i].c === false && Box[i].f === false && Box[i].b === false) || (Box[i].b === true && Box[i].f === true))){
            flagW = true;
        }
    }
    //if you won, set win variable to true
    if(flagW === false/*flagged === numMines*/){
        win = true;
    }
    }
    }
    //game reset: reset all variables
    if(reset === true){
timeToClick = 50;
clicked = false;
       //starting time
startTime = 200;
//reset timer
time = startTime;
//weather the game resets or not
reset = false;
//how big each box is
boxSize = 40;
//number of mines (50 is good)
numMines = 25;
//weather you lost or not
lose = false;
//stores Boxes
Box = [];
//creats all Boxes and stores them in Box
for(var x = 0; x < 600;x+= boxSize){
    for(var y = boxSize*5; y < 600;y += boxSize){
        Box.push({x:x,y:y,b:false,c:true,n:0,f:false,num:0,numf:0});
    }
}
//weather you won or not
win = false;
//number of mines
num = 0;
} 
fill(0, 0, 0);
//text(aifl,200,10);
//aifl--;
if(clicked === false){
        for(var i = 0; i < Box.length;i++){
            noStroke();
            fill(173, 173, 173);
    ellipse(100,50,100,100);
    fill(0, 0, 0);
    text("no flag",100,50);
    fill(173, 173, 173);
    ellipse(500,50,100,100);
    fill(0, 0, 0);
    text("flag",500,50);
    stroke(84, 84, 84);
        fill(110, 110, 110);
        rect(Box[i].x,Box[i].y,boxSize,boxSize);
        noStroke();
        fill(166, 166, 166);
        if(dist(Box[i].x + (boxSize/2),Box[i].y + (boxSize/2),mouseX,mouseY) < safeSpace && showSafeSpace){
            fill(28, 207, 0);
        }
        rect(Box[i].x + (boxSize/10) + 1,Box[i].y + (boxSize/10) + 1,boxSize*0.8 - 1,boxSize*0.8 - 1);
        }
    }
    //ellipse(mouseX,mouseY,safeSpace,safeSpace);
    //trr++;
    //text(trr,200,20);
    
    if(showFlagged){
    fill(0, 0, 0);
  text(flagged + "/" + numMines + " mines flagged",300,30);
    }
        //ellipse(200,200,10,10);
        ctime--;
        strokeWeight(1);
        textSize(12);
        stroke(0, 0, 0);
        fill(255, 255, 255);
        ellipse(300,40,70,70);
        fill(0, 0, 0);
        if(controlType === "button control"){
        text("button\ncontrols",300,40);
        if(mouseIsPressed && dist(mouseX,mouseY,300,40) < 70 && ctime < 0){
            controlType = "mouse control";
            ctime = sctime;
        }
        }
        else if(controlType === "mouse control"){
        text("mouse\ncontrols",300,40);
        if(mouseIsPressed && dist(mouseX,mouseY,300,40) < 70 && ctime < 0){
            controlType = "button control";
            ctime = sctime;
        }
        }
        text("click to toggle",300,85);
        aiTime--;
};
