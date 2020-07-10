/*
    calc.js
    James Baker
    6/25/20
    jamesbaker425@gmail.com
*/

//Whenever the user clicks a number button, it is sent to be input to the display
function inputClick(e) {
    let inp = e.target.getAttribute("value");
    input(inp);
}

//Whenever the keyboard is used, this function directs valid
//input to the proper function
function inputKey(e) {
    if (e.key >= "0" && e.key <= "9") { input(e.key); }
    else if (e.key == "Backspace") { backspace(); }
    else if (e.key == "+") { operator("add"); }
    else if (e.key == "-") { operator("sub"); }
    else if (e.key == "*") { operator("mul"); }
    else if (e.key == "/") { operator("div"); }
    else if (e.key == ".") { point(); }
    else if (e.key == "=" || e.key == "Enter") { operate(); }
}

//For any numbers being clicked or typed, this function will
//add that number as the next digit they are typing, whatever the
//display string is gets converted into a number from there
function input(inp) {
    //Gets rid of 0 if it's the only thing displayed,
    //otherwise, it adds to the string
    if (freshInput) { 
        dis = inp;
        freshInput = false;
    }
    else{ 
        dis += inp; 
    }
    //The Number() function will convert a string into an int or float
    document.getElementById("dis").innerHTML = dis;
    num2 = Number(dis);
}

//This function will slice off the last character of the display
//and change the numbers in the calculator to represent what is displayed
function backspace() {
    if (freshInput && dis != "") {
        clear();
    }
    dis = dis.slice(0, -1);
    freshInput = dis == "";
    document.getElementById("dis").innerHTML = dis;
    num2 = Number(dis);
}

//Whenever the "." button is pressed, we add that to the display string.
//Also, accounts for when it is the first button pushed on a fresh input.
function point() {
    if (!(pointUsed || freshInput)) { 
        dis += ".";
        pointUsed = true;
    }
    else if(freshInput) {
        if (dis != "") {
            clear();
        }
        dis = "0.";
        pointUsed = true;
        freshInput = false;
    }
    document.getElementById("dis").innerHTML = dis;
}

//Gets called whenever a button for an operator (+,-,*,/)
//gets pressed. 
function operatorClick(e) {
    var op = e.target.getAttribute("id")
    operator(op);
}

//Tells the program which operator to use as lastOp. Also responsible
//for displaying answer if chaining operators
function operator(op) {
    //If chaining operations together, we need to keep the result
    //of the preceeding operation.
    if (!isFirstOp) {
        operate();
    }
    //If starting to type a new equation
    else if(!freshInput){
        num1 = num2;
    }
    //Set up for second input
    num2 = 0;
    dis = "";
    lastOp = op;
    isFirstOp = false;
    freshInput = true;
    pointUsed = false;
    document.getElementById("LastOp").innerHTML = ops[op];
}

//Gets called when user clicks the "=" button. Performs the
//last operation called;
function operate() {
    //If an operator button has been clicked before "="
    if (lastOp != "" && dis != "") {
        //Add if that was the last operation used
        if (lastOp == "add") {
            //Show sum on display and keep a running total in num1
            num1 += num2;            
        }
        //Subtract if that was the last operation used
        else if (lastOp == "sub") {
            num1 -= num2;
        }
        //Multiply if that was the last operation used
        else if (lastOp == "mul") {  
            num1 *= num2;
        }
        //Divide if that was the last operation used
        else if (lastOp == "div") {
            //Don't allow division by 0
            if (num2 != 0) {
                num1 /= num2;
            }
            else {
                alert("Cannot divide by 0! Everybody should know that!");
                clear()
            }   
        }
        //Round off any long floats for answers and send to display
        num1 = roundFloat(num1, 3);
        dis = num1.toString();
        //Prepare for next input if needed and display result
        isFirstOp = true;
        freshInput = true;
        pointUsed = false;
        document.getElementById("dis").innerHTML = dis;
   }
}

//Whenever the "C" button is pressed, we will reset 
//all variables to their defaults
function clear() {
    num1 = 0;
    num2 = 0;
    dis = "";
    lastOp = "";
    isFirstOp = true;
    freshInput = true;
    pointUsed = false;
    document.getElementById("dis").innerHTML = dis;
    document.getElementById("LastOp").innerHTML = ops[lastOp];
}

//Helper function to round long floats into a specified amount of decimal places 
function roundFloat(num, places) { 
    return +(Math.round(num + "e+" + places)  + "e-" + places);
}

//-------------------------------------------------//
//---Where the script starts; main() if you will.---
//-------------------------------------------------//
const ops = {"add": "+", "sub": "-", "mul": "&times;", "div": "&divide;", "": ""};

//Set up event listeners for numbers
nums = document.getElementsByClassName("num");
for (let elem of nums) {
    elem.addEventListener("click", inputClick);
}

document.addEventListener("keydown", inputKey);

var num1 = 0;
var num2 = 0;
var dis = "";
var lastOp = "";
var isFirstOp = true;
var freshInput = true;
var pointUsed = false;

//Set up event listeners for operators and clear
document.getElementById("add").addEventListener("click", operatorClick);
document.getElementById("sub").addEventListener("click", operatorClick);
document.getElementById("mul").addEventListener("click", operatorClick);
document.getElementById("div").addEventListener("click", operatorClick);
document.getElementById("eq").addEventListener("click", operate);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("pt").addEventListener("click", point);
document.getElementById("bksp").addEventListener("click", backspace);
