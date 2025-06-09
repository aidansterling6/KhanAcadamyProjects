var a = 20;
var b = 2;

var toDecimal = function(bits){
    var out = 0;
    var I = 0;
    for(var i = bits.length - 1; i >= 0; i--){
        out += pow(2, I) * bits[i];
        I++;
    }
    return out;
};

var padBits = function(bits1, bits2) {
    while(bits1.length < bits2.length) {
        bits1.unshift(0);
    }
    while(bits2.length < bits1.length) {
        bits2.unshift(0);
    }
    return {bits1: bits1, bits2: bits2};
};

var adder = function(bits1, bits2){
    var out = [];
    var carry = 0;
    var paddedBits = padBits(bits1, bits2);
    bits1 = paddedBits.bits1;
    bits2 = paddedBits.bits2;
    for(var i = bits1.length - 1; i >= 0; i--){
        var sum = bits1[i] + bits2[i] + carry;
        if(sum === 1){
            out.unshift(1);
            carry = 0;
        } else if(sum === 2){
            out.unshift(0);
            carry = 1;
        } else if(sum === 3){
            out.unshift(1);
            carry = 1;
        } else {
            out.unshift(0);
        }
    }
    if(carry === 1) {
        out.unshift(1);
    }
    return out;
};

var subtractor = function(bits1, bits2){
    var out = [];
    var borrow = 0;
    var paddedBits = padBits(bits1, bits2);
    bits1 = paddedBits.bits1;
    bits2 = paddedBits.bits2;
    for(var i = bits1.length - 1; i >= 0; i--){
        var diff = bits1[i] - bits2[i] - borrow;
        if(diff >= 0){
            out.unshift(diff);
            borrow = 0;
        } else {
            out.unshift(1);
            borrow = 1;
        }
    }
    return out;
};

// ... (the rest of your code)



var multiplier = function(bits1, bits2) {
    var out = Array(bits1.length + bits2.length).fill(0);
    for (var i = bits1.length - 1; i >= 0; i--) {
        for (var j = bits2.length - 1; j >= 0; j--) {
            out[i + j + 1] += bits1[i] * bits2[j];
            out[i + j] += Math.floor(out[i + j + 1] / 2);
            out[i + j + 1] %= 2;
        }
    }
    return out;
};

var toBinary = function(num){
    var out = [];
    while(num > 0){
        out.unshift(num % 2);
        num = Math.floor(num / 2);
    }
    return out;
};

var divider = function(bits1, bits2) {
    if (toDecimal(bits2) === 0) {
        return "Cannot divide by zero";
    }

    var dividend = toDecimal(bits1);
    var divisor = toDecimal(bits2);
    var quotient = Math.floor(dividend / divisor);

    return toBinary(quotient);
};

var num1 = toBinary(a);
var num2 = toBinary(b);

draw = function() {
    background(255, 255, 255);
    fill(0, 0, 0);
    text("number 1: " + toDecimal(num1), 100, 100);
    text("number 2: " + toDecimal(num2), 100, 120);
    text("number 1 + number 2: " + toDecimal(adder(num1, num2)), 100, 140);
    text("number 1 - number 2: " + toDecimal(subtractor(num1, num2)), 100, 160);
    text("number 1 * number 2: " + toDecimal(multiplier(num1, num2)), 100, 180);
    text("number 1 / number 2: " + toDecimal(divider(num1, num2)), 100, 200);
};
