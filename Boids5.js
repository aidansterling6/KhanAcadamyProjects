var boids = [];
var Width = 800;
var Height = 800;
var Scale = 0.5;
var boidCount = 600;
var border = 20;
var borderForce = 0.3;
var speedDrag = 0.1;
var alignSpeedForce = 0.01;
var spacingForceTouch = 0.5;
var spacingForceMin = 0.1;
var spacingForceMax = 0.2;
var interactDist = 17;
var targetDistMax = 17;
var targetDistMin = 12;
var targetDistTouch = 5;
for(var i = 0; i < boidCount;i++){
    boids.push({x:random(border,Width - border), y:random(border,Height - border), sx:random(-1,1),sy:random(-1,1), speed:1.3});
}
var boid = function(){
    for(var i = 0; i < boids.length;i++){
        fill(0, 0, 0);
        ellipse(boids[i].x, boids[i].y, 5, 5);
        line(boids[i].x, boids[i].y, boids[i].x + boids[i].sx*10, boids[i].y + boids[i].sy*10);
        boids[i].x += boids[i].sx;
        boids[i].y += boids[i].sy;
        if(boids[i].x < border){
            boids[i].sx += borderForce;
        }
        if(boids[i].x > Width - border){
            boids[i].sx -= borderForce;
        }
        if(boids[i].y < border){
            boids[i].sy += borderForce;
        }
        if(boids[i].y > Height - border){
            boids[i].sy -= borderForce;
        }
        if(dist(0,0,boids[i].sx, boids[i].sy) > boids[i].speed){
            boids[i].sx *= (1 - speedDrag);
            boids[i].sy *= (1 - speedDrag);
        } else if(dist(0,0,boids[i].sx, boids[i].sy) < boids[i].speed){
            boids[i].sx *= 1 + speedDrag;
            boids[i].sy *= 1 + speedDrag;
        }
        for(var o = 0; o < boids.length;o++){
            if(!(boids[i].sx === boids[o].sx && boids[i].sy === boids[o].sy) && dist(boids[i].x, boids[i].y, boids[o].x, boids[o].y) < interactDist){
                if(boids[i].sx > boids[o].sx){
                    boids[i].sx -= alignSpeedForce;
                    boids[o].sx += alignSpeedForce;
                } else if(boids[i].sx < boids[o].sx){
                    boids[i].sx += alignSpeedForce;
                    boids[o].sx -= alignSpeedForce;
                }
                if(boids[i].sy > boids[o].sy){
                    boids[i].sy -= alignSpeedForce;
                    boids[o].sy += alignSpeedForce;
                } else if(boids[i].sy < boids[o].sy){
                    boids[i].sy += alignSpeedForce;
                    boids[o].sy -= alignSpeedForce;
                }
                var d = dist(boids[i].x, boids[i].y, boids[o].x, boids[o].y);
                var d2 = dist(boids[i].sx, boids[i].sy, boids[o].sx, boids[o].sy);
                if(d < targetDistTouch){
                    boids[i].sx += spacingForceTouch*(boids[i].x - boids[o].x)/d;
                    boids[i].sy += spacingForceTouch*(boids[i].y - boids[o].y)/d;
                    //boids[i].sx += spacingForceMin*(boids[i].sx - boids[o].sx)/d2;
                    //boids[i].sy += spacingForceMin*(boids[i].sy - boids[o].sy)/d2;
                    //boids[o].sx -= spacingForceMin*(boids[i].sx - boids[o].sx)/d2;
                    //boids[o].sy -= spacingForceMin*(boids[i].sy - boids[o].sy)/d2;
                } else if(d < targetDistMin){
                    boids[i].sx += spacingForceMin*(boids[i].x - boids[o].x)/d;
                    boids[i].sy += spacingForceMin*(boids[i].y - boids[o].y)/d;
                    //boids[i].sx += spacingForceMin*(boids[i].sx - boids[o].sx)/d2;
                    //boids[i].sy += spacingForceMin*(boids[i].sy - boids[o].sy)/d2;
                    //boids[o].sx -= spacingForceMin*(boids[i].sx - boids[o].sx)/d2;
                    //boids[o].sy -= spacingForceMin*(boids[i].sy - boids[o].sy)/d2;
                } else if(d > targetDistMax){
                    boids[i].sx -= spacingForceMax*(boids[i].x - boids[o].x)/d;
                    boids[i].sy -= spacingForceMax*(boids[i].y - boids[o].y)/d;
                    //boids[i].sx -= spacingForceMax*(boids[i].x - boids[o].x)/d;
                    //boids[i].sy -= spacingForceMax*(boids[i].y - boids[o].y)/d;
                }
                //boids[i].sx = boids[i].speed * boids[i].sx/dist(0, 0, boids[i].sx, boids[i].sy);
                //boids[i].sy = boids[i].speed * boids[i].sy/dist(0, 0, boids[i].sx, boids[i].sy);
            }
        }
    }
};
draw = function() {
    background(224, 224, 224);
    pushMatrix();
    scale(Scale);
    boid();
    popMatrix();
};