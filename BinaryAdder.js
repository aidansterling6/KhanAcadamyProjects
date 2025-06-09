var adder = function(bits1, bits2){
    if(bits1.length !== bits2.length){
        return [];
    }
    var out = [];
    var carry = 0;
    for(var i = bits1.length - 1; i >= 0; i--){
        out.push(0);
    }
    if(bits1[0] === 1 || bits2[0] === 1){
        bits1 = concat([0], bits1);
        bits2 = concat([0], bits2);
        out = concat([0], out);
    }
    for(var i = bits1.length - 1; i >= 0; i--){
        var sum = bits1[i] + bits2[i] + carry;
        if(sum === 1){
            out[i] = 1;
            carry = 0;
        } else if(sum === 2){
            out[i] = 0;
            carry = 1;
        } else if(sum === 3){
            out[i] = 1;
            carry = 1;
        }
    }
    return out;
};
var toDecimal = function(bits){
    var out = 0;
    var I = 0;
    for(var i = bits.length - 1; i >= 0; i--){
        out += pow(2, I) * bits[i];
        I++;
    }
    return out;
};
var num1 = [1, 1, 0, 1, 1];
var num2 = [0, 1, 1, 0, 1];
draw = function() {
    background(255, 255, 255);
    fill(0, 0, 0);
    text("number 1: " + toDecimal(num1), 100, 100);
    text("number 2: " + toDecimal(num2), 100, 120);
    text("number 1 + number 2: " + toDecimal(adder(num1, num2)), 100, 140);
};
