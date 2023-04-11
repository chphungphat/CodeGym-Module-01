document.getElementById("add").addEventListener("click", Additition);
document.getElementById("subtract").addEventListener("click", Subtraction);
document.getElementById("multiply").addEventListener("click", Multiplication);
document.getElementById("divide").addEventListener("click", Division);

function Additition() {
    let numb1 = document.getElementById("number1").value;
    let numb2 = document.getElementById("number2").value;
    let result = parseInt(numb1) + parseInt(numb2);
    document.getElementById("result").innerHTML = result;
}

function Subtraction() {
    let numb1 = document.getElementById("number1").value;
    let numb2 = document.getElementById("number2").value;
    let result = parseInt(numb1) - parseInt(numb2);
    document.getElementById("result").innerHTML = result;
}

function Multiplication() {
    let numb1 = document.getElementById("number1").value;
    let numb2 = document.getElementById("number2").value;
    let result = parseInt(numb1) * parseInt(numb2);
    document.getElementById("result").innerHTML = result;
}

function Division() {
    let numb1 = document.getElementById("number1").value;
    let numb2 = document.getElementById("number2").value;
    let result = parseInt(numb1) / parseInt(numb2);
    document.getElementById("result").innerHTML = result;
}