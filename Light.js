var lines = [{ x1: 125.1, y1: 200.1, x2: 230, y2: 150 }, { x1: 67.1, y1: 156.1, x2: 230, y2: 150 }, { x1: 125.1, y1: 200.1, x2: 67, y2: 156 }];
var x = 0;
var y = 0;

function calculateIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var a = y2 - y1;
  var b = x2 - x1;
  var c = y4 - y3;
  var d = x4 - x3;
  var denominator = a * d - b * c;
  
  if (denominator === 0) {
    return null; // Parallel or coincident lines, no intersection
  }
  
  var h = x1;
  var k = y1;
  var j = x3;
  var l = y3;
  
  var numerator1 = -c * j * b + d * l * b + a * d * h - d * k * b;
  var numerator2 = a * c * h - c * j * a - a * l * b + k * b * c;
  
  var x = numerator1 / denominator;
  var y = numerator2 / denominator;
  
  return { x: x, y: y };
}

function checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var intersection = calculateIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
  if (intersection === null) {
    return false;
  }
  
  var x = intersection.x;
  var y = intersection.y;
  
  var dist1 = dist(x1, y1, x, y) + dist(x2, y2, x, y);
  var dist2 = dist(x3, y3, x, y) + dist(x4, y4, x, y);
  var distLine1 = dist(x1, y1, x2, y2);
  var distLine2 = dist(x3, y3, x4, y4);
  
  var t = !((x === x3 && y === y3) || (x === x4 && y === y4)) &&
    round(dist1) === round(distLine1) + round(distLine2) &&
    round(dist2) === round(distLine1) + round(distLine2);
  
  return t;
}

function draw() {
  background(255, 255, 255);
  var X = mouseX;
  var Y = mouseY;

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var temp = map(5076 / (dist(x, y, X, Y)), 0, 171, 0, 255);
      set(x, y, color(temp, temp, temp));

      for (var i = 0; i < lines.length; i++) {
        if (checkIntersection(x, y, X, Y, lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2)) {
          set(x, y, color(0, 0, 0));
        }
      }
    }
  }

  for (var i = 0; i < lines.length; i++) {
    line(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
  }

  updatePixels();
}