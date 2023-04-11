let login = prompt("Who are you??");
let message = (login == "Employee") ?
    "Hello" :
    (login == "Director") ?
        "Greetings" :
        (login == " ") ?
            "No login" :
                " ";
alert(message);