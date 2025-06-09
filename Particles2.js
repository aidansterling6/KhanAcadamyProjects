var maxSpeed = 0.8;
var particles = [];
var spawnParticles = function(){
    for(var i = 0; i < 1000; i++){
        particles.push({x:random(0,400), y:random(0,400), vx:0, vy:0});
    }
};
var drawParticles = function(){
    for(var i = 0; i < particles.length; i++){
        noStroke();
        fill(255, 255, 0);
        ellipse(particles[i].x, particles[i].y, 2,2);
    }
};
var noiseVectors = function(x, y){
    var scale = 1/73;
    var scale2 = 1/16;
    var tmp = {
        x:(noise(x*scale, y*scale)-0.45)*2 + (noise(x*scale2 + 100, y*scale2 - 10)-0.49)*0.2,
        y:(noise(x*scale + 10000, y*scale + 10000)-0.45)*2 + (noise(x*scale2 - 1000, y*scale2 -500)-0.49)*2
    };
    var Dist = dist(0,0,tmp.x, tmp.y);
    var force = 0.01;
    var outx = force*(tmp.x/Dist);
    var outy = force*(tmp.y/Dist);
    return {x:outx,y:outy};
};
var updateParticles = function(){
    for(var i = 0; i < particles.length; i++){
        var tmp = noiseVectors(particles[i].x, particles[i].y);
        particles[i].vx += tmp.x;
        particles[i].vy += tmp.y;
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        var Dist = dist(0,0, particles[i].vx, particles[i].vy);
        if(Dist > maxSpeed){
            particles[i].vx = maxSpeed*particles[i].vx/Dist;
            particles[i].vy = maxSpeed*particles[i].vx/Dist;
        }
        if(particles[i].x < 0){
            particles[i].x = 400 + particles[i].x;
        }
        if(particles[i].x > 400){
            particles[i].x = particles[i].x - 400;
        }
        if(particles[i].y < 0){
            particles[i].y = 400 + particles[i].y;
        }
        if(particles[i].y > 400){
            particles[i].y = particles[i].y - 400;
        }
    }
};
spawnParticles();
draw = function() {
    background(0, 0, 0);
    for(var x = 0; x < 400; x += 20){
        for(var y = 0; y < 400; y += 20){
            var tmp = noiseVectors(x, y);
            stroke(255, 0, 0);
            //line(x, y, x + tmp.x*500, y + tmp.y*500);
        }
    }
    drawParticles();
    updateParticles();
};