let Radius = parseInt(prompt("Nhap ban kinh R = "));
let Area = Radius*Radius*3.14;
let Perimeter = Radius*2*3.14;
document.getElementById("AreaResult").innerHTML = "Dien tich hinh tron la " + Area;
document.getElementById("PerimeterResult").innerHTML = "Chu vi hinh tron la " + Perimeter;