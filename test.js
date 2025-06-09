var Grid = [];

for(var x = 0; x < 3; x++){
    Grid.push([]);
}
for(var x = 0; x < Grid.length; x++){
    for(var y = 0; y < 10; y++){
        Grid[x].push(false);
    }
}
Grid[0][0] = true;
Grid[0][3] = true;
Grid[0][7] = true;

Grid[1][5] = true;
Grid[1][6] = true;

Grid[2][2] = true;
Grid[2][8] = true;
var Columns = [];
for(var x = 0; x < Grid.length; x++){
    Columns.push([]);
}
for(var x = 0; x < Grid.length; x++){
    var count = 0;
    for(var y = 0; y < Grid[x].length; y++){
        count++;
        if(Grid[x][y]){
            Columns[x].push({Base:y, Len:count});
            count = 0;
        }
    }
}
var Cards = [];
var Row = [];
for(var x = 0; x < Grid.length; x++){
    Row.push(false);
}
Cards.push(-1);
for(var x = 0; x < Grid.length; x++){
    Row[x] = Grid[x][0];
}
for(var x = 0; x < Grid.length; x++){
    fill(0, 0, 0);
    text(Row[x], x*50 + 200, 100);
}
for(var y = 1; y < Grid[0].length; y++){
    for(var x = 0; x < Grid.length; x++){
        if(Row[x] && Grid[x][y]){
            Cards.push(y - 1);
            for(var x = 0; x < Grid.length; x++){
                Row[x] = Grid[x][y];
                fill(0, 0, 0);
                text(Row[x], x*50 + 200, y*20 + 100);
            }
            break;
        } else if(Grid[x][y]){
            Row[x] = true;
        }
    }
    for(var x = 0; x < Grid.length; x++){
        fill(0, 0, 0);
        text(Row[x], x*50 + 200, y*20 + 100);
    }
}
    for(var x = 0; x < Grid.length; x++){
        for(var y = 0; y < Grid[x].length; y++){
            fill(0, 0, 0);
            if(Grid[x][y]){
                ellipse(x*20 + 100, y*20 + 100, 4,4);
            } else{
                ellipse(x*20 + 100, y*20 + 100, 2,2);
            }
        }
        for(var i = 0; i < Columns[x].length; i++){
            line(x*20 + 95, Columns[x][i].Base*20 + 100, x*20 + 100, (Columns[x][i].Base - Columns[x][i].Len)*20 + 100);
        }
    }
    for(var i = 0; i < Cards.length; i++){
        line(95 - 20, Cards[i]*20 + 100 + 10, Grid.length*20 + 100, Cards[i]*20 + 100 + 10);
    }
    var num = 1;
    for(var x = 0; x < 20; x++){
        var start = 0;
        var iter = 1;
        if(x%2 !== 0){
            start = 20-1;
            iter = -1;
        }
        for(var y = start; (y < 20 && y >= 0); y += iter){
            noStroke();
            fill(noise(num/200)*255, noise(num/100)*241, 0);
            //ellipse(x*10 + 200, y*10 + 350, abs(sin(num)*5),abs(sin(num)*5));
            text(round(num), x*27 + 41, y*10 + 350);
            num += 1;
        }
    }
    
    
draw = function() {
    //background(255, 255, 255);
    /*
    for(var x = 0; x < Grid.length; x++){
        for(var y = 0; y < Grid[x].length; y++){
            fill(0, 0, 0);
            if(Grid[x][y]){
                ellipse(x*20 + 100, y*20 + 100, 4,4);
            } else{
                ellipse(x*20 + 100, y*20 + 100, 2,2);
            }
        }
        for(var i = 0; i < Columns[x].length; i++){
            line(x*20 + 95, Columns[x][i].Base*20 + 100, x*20 + 100, (Columns[x][i].Base - Columns[x][i].Len)*20 + 100);
        }
    }
    for(var i = 0; i < Cards.length; i++){
        line(95 - 20, Cards[i]*20 + 100 + 10, Grid.length*20 + 100, Cards[i]*20 + 100 + 10);
    }
    text(Grid.length + ", " + Columns.length, 200, 200);
    */
    var X = 0;
    var Y = 0;
    
    noStroke();
    fill(255, 255, 255);
    rect(340, 65, 230, 230);
    for(var x = 0; x < 20/2; x++){
        for(var y = 0; y < 20/2; y++){
            noFill();
            stroke(0, 0, 0);
            if(floor(X/2) === x && floor(Y/2) === y){
                fill(66, 173, 255);
            }
            rect(x*10*2 + 349, y*10*2 + 68, 10*2,10*2);
        }
    }
    for(var x = 0; x < 20; x++){
        for(var y = 0; y < 20; y++){
            noFill();
            stroke(0, 0, 0);
            if(X === x && Y === y){
                fill(255, 0, 0);
            }
            rect(x*10 + 349 + 2, y*10 + 68 + 2, 10 - 4,10 - 4);
        }
    }
};
