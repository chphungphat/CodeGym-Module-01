let username = prompt("Input your username");
if (username != "Admin") {
    if (username == "null")
        alert("Canceled");
    else
        alert("I don't know who you are")
}
else {
    let password = prompt("Now input your password");
    if (password != "TheMaster") {
        if (password == "null")
            alert("Canceled");
        else
            alert("Wrong Password");
    }
    else
        alert("Welcome Master");
}