function Conversion() {
    const ratio = 25000;
    let inamount = document.getElementById("amount").value;
    let incur = document.getElementById("inputCurrency").value;
    let outcur = document.getElementById("outputCurrency").value;
    if (incur == "VND" && outcur == "USD")
    {
        let result = inamount/ratio;
        document.getElementById("result").innerHTML = result;
    }
    else {
        let result = inamount*ratio;
        document.getElementById("result").innerHTML = result;
    }
}     