//var MegaCalcuWower = (function(output,buttons){

var calcWrap = $('#calcWrap');

if (calcWrap.length) {
    var calc = new MegaCalcuWower(calcWrap);
}

function MegaCalcuWower(wrapper){
    
    var buttons = calcWrap.find('.buttons');
    var output = calcWrap.find('.output');

    // Utilities
    var hasDecimal = false;
    var memory = [];
    var currentOperator;
    var operators = ['-','+','*'];
    
    // Elements
    var numbers = buttons.find('.number');
    var clear = buttons.find('.clear');
    var decimal = buttons.find('.decimal');
    var plus = buttons.find('.plus');
    var equals = buttons.find('.equals');
    var minus = buttons.find('.minus');
    var times = buttons.find('.times');
    var divide = buttons.find('.divide');
    
    function clearOutput(x){
        output.text(x);
        return hasDecimal = false;
    }

    function error(){
        output.text('Err');
        return hasDecimal = false;
    }

    function checkLength(i){
        var countResult = i.toString().length;
        if (countResult > 12) {
            error();
            return false;
        }
    }

    function saveValue(i){
        currentOutput = output.text();
        memory[i] = currentOutput;
        return memory;
    }
    
    // Do the maths
    function operate(term1,term2,operator){
        var result = '0';
        if (operator == '+'){
            var term1 = parseFloat(memory[0]);
            var term2 = parseFloat(currentOutput);
            result = term1 + term2;
            return result;
        } else if (operator == '-'){
            var term1 = parseFloat(memory[0]);
            var term2 = parseFloat(currentOutput);
            result = term1 - term2;
            return result;
        } else if (operator == '/'){
            var term1 = parseFloat(memory[0]);
            var term2 = parseFloat(currentOutput);
            result = term1 / term2;
            return result;
        } else if (operator == '*'){
            var term1 = parseFloat(memory[0]);
            var term2 = parseFloat(currentOutput);
            result = term1 * term2;
            return result;
        }
    }
    
    // Listeners
    numbers.on('click', function(){
        clickedNumber = $(this).data('num');
        currentOutput = output.text();
        if ( isNaN(currentOutput) || currentOutput == '0') {
            currentOutput = '';
        }
        newOutput = currentOutput + clickedNumber;
        if (checkLength(newOutput) == false){
            return;
        }
        output.text(newOutput);
    });
    
    decimal.on('click', function(){
        if (hasDecimal == false) {
            clickedNumber = '.';
            currentOutput = output.text();
            if ( isNaN(currentOutput)) {
                //if (isInArray(currentOutput,operators)) {
                    //currentOutput = '0';
                //} else {
                    currentOutput = '0';
                //}
            }
            newOutput = currentOutput + clickedNumber;
            if (checkLength(newOutput) == false){
                return;
            }
            output.text(newOutput);
            return hasDecimal = true;
        }
    });

    clear.on('click', function(){
        clearOutput('0');
    });

    plus.on('click', function(){
        saveValue(0);
        currentOperator = '+';
        clearOutput('+');
    });

    minus.on('click', function(){
        saveValue(0);
        currentOperator = '-';
        clearOutput('-');
    });

    times.on('click', function(){
        saveValue(0);
        currentOperator = '*';
        clearOutput('*');
    });

    divide.on('click', function(){
        saveValue(0);
        currentOperator = '/';
        clearOutput('÷');
    });
    
    equals.on('click', function(){
        currentOutput = output.text();
        var result = operate(memory[0],currentOutput,currentOperator);
        
        
        var countResult = result.toString().length;
        if (checkLength(result) == false){
            return;
        }
        output.text(result);
        return hasDecimal = false;
    });
}