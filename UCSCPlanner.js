var classes = [
    {
        name: "CSE 20",
        year: 0,
        pre: [],
        quarter: 0,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "MATH 19A",
        year: 0,
        pre: [],
        quarter: 0,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "College Core",
        year: 0,
        pre: [],
        quarter: 0,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CSE 30",
        year: 0,
        pre: [],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CMPM 80K",
        year: 0,
        pre: [],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "MATH 19B",
        year: 0,
        pre: [],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "WRIT 1",
        year: 0,
        pre: [],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "ARTG 80I",
        year: 0,
        pre: [],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "WRIT 2",
        year: 0,
        pre: [],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CSE 16",
        year: 0,
        pre: [],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CSE 12",
        year: 0,
        pre: [],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "ART 101",
        year: 1,
        pre: [],
        quarter: 0,
        validQuarters: [0, 1, 2],
        extra: ["art"]
    },
    {
        name: "CSE 13S",
        year: 1,
        pre: [],
        quarter: 0,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "MATH 21",
        year: 1,
        pre: [],
        quarter: 0,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "EART 30",
        year: 1,
        pre: [],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CSE 40",
        year: 1,
        pre: [],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CSE 101",
        year: 1,
        pre: [],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "ARTG 118",
        year: 1,
        pre: [],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: ["art"]
    },
    {
        name: "ARTG 131",
        year: 1,
        pre: [],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: ["art"]
    },
    {
        name: "EART 3",
        year: 1,
        pre: [],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CSE 111",
        year: 2,
        pre: ["CSE 101"],
        quarter: 0,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "ARTG 80G",
        year: 2,
        pre: [],
        quarter: 0,
        validQuarters: [0],
        extra: []
    },
    {
        name: "CMPM 176",
        year: 2,
        pre: ["CMPM 80K"],
        quarter: 0,
        validQuarters: [0, 1],
        extra: []
    },
    {
        name: "FILM 80V",
        year: 2,
        pre: [],
        quarter: 1,
        validQuarters: [1],
        extra: []
    },
    {
        name: "CMPM 150",
        year: 2,
        pre: [],
        quarter: 1,
        validQuarters: [0],
        extra: ["CGE", "art"]
    },
    {
        name: "ARTG 91",
        year: 2,
        pre: [],
        quarter: 1,
        validQuarters: [1],
        extra: ["low art"]
    },
    {
        name: "ARTG 120",
        year: 2,
        pre: ["ARTG 80G", "CMPM 80K", "FILM 80V", "CSE 30"],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CMPM 120",
        year: 2,
        pre: ["CMPM 80K", "FILM 80V", "CSE 30", "ARTG 80I"],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: []
    },
    {
        name: "CMPM 146",
        year: 2,
        pre: ["CSE 101"],
        quarter: 2,
        validQuarters: [0, 1, 2],
        extra: ["CGE", "art"]
    },
    {
        name: "ARTG 170",
        year: 3,
        pre: ["ARTG 120", "CMPM 120"],
        quarter: 0,
        validQuarters: [0],
        extra: []
    },
    {
        name: "CMPM 25",
        year: 3,
        pre: [],
        quarter: 0,
        validQuarters: [0],
        extra: ["art"]
    },
    {
        name: "CMPM 121",
        year: 3,
        pre: ["CMPM 120"],
        quarter: 0,
        validQuarters: [0],
        extra: ["CGE"]
    },
    {
        name: "ARTG 171",
        year: 3,
        pre: ["ARTG 170"],
        quarter: 1,
        validQuarters: [1],
        extra: []
    },
    {
        name: "CMPM 147",
        year: 3,
        pre: ["CMPM 120"],
        quarter: 1,
        validQuarters: [0, 1, 2],
        extra: ["CGE"]
    },
    {
        name: "ARTG 172",
        year: 3,
        pre: ["ARTG 171"],
        quarter: 2,
        validQuarters: [2],
        extra: []
    },
    {
        name: "CMPM 148",
        year: 3,
        pre: ["CSE 101"],
        quarter: 2,
        validQuarters: [2],
        extra: ["CGE"]
    },
    {
        name: "CMPM 170",
        year: 4,
        pre: ["CMPM 120", "ARTG 120", "CSE 111"],
        quarter: 0,
        validQuarters: [0],
        extra: []
    },
    {
        name: "CMPM 171",
        year: 4,
        pre: ["CMPM 170", "CMPM 176"],
        quarter: 1,
        validQuarters: [1],
        extra: []
    },
    {
        name: "CMPM 172",
        year: 4,
        pre: ["CMPM 171"],
        quarter: 2,
        validQuarters: [2],
        extra: []
    }
    
    
];

var Width = 600;
var Height = 600;

var before = function(year1, quart1, year2, quart2){
    return year1*4 + quart1 <= year2*4 + quart2;
};

var drawChart = function(){
    for(var year = 0; year <= 4; year++){
        for(var quarter = 0; quarter <= 3; quarter++){
            var pos = 0;
            for(var i = 0; i < classes.length; i++){
                strokeWeight(1);
                if(classes[i].year === year && classes[i].quarter === quarter){
                
                var error = false;
                for(var p = 0; p < classes[i].pre.length; p++){
                    var Terror = true;
                    for(var o = 0; o < classes.length;o++){
                        if(i !== o){
                            if(classes[i].pre[p] === classes[o].name && before(classes[o].year, classes[o].quarter, year, quarter)){
                                Terror = false;
                            }
                        }
                    }
                    if(Terror){
                        error = true;
                    }
                }
                fill(255, 255, 255);
                if(error){
                    fill(255, 0, 0);
                }
                rect(Width*quarter/4, Height*year/5 + Height*pos/20, Width/4, Height/20);
                classes[i].x = Width*quarter/4;
                classes[i].y = Height*year/5 + Height*pos/20;
                fill(0, 0, 0);
                text(classes[i].name, Width*quarter/4 + 10, Height*year/5 + Height*pos/20 + 20);
                pos++;
                    
                }
                    
            }
            noFill();
            strokeWeight(3);
            rect(Width*quarter/4, Height*year/5, Width/4, Height/5);
        }
    }
    
    for(var i = 0; i < classes.length; i++){
                strokeWeight(1);
                
                var error = false;
                for(var p = 0; p < classes[i].pre.length; p++){
                    var Terror = true;
                    for(var o = 0; o < classes.length;o++){
                        if(i !== o){
                            if(mouseIsPressed && mouseX > classes[i].x && mouseX < classes[i].x + Width/4 && mouseY > classes[i].y && mouseY < classes[i].y + Height/20){
                            if(classes[i].pre[p] === classes[o].name){
                                line(classes[i].x + 10, classes[i].y + 20, classes[o].x + 10, classes[o].y + 20);
                            }
                            }
                        }
                    }
                }
    }
};

draw = function() {
    background(255, 255, 255);
    drawChart();
};


