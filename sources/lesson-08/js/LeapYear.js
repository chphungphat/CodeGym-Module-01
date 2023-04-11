let inYear = parseInt(prompt("Nhập năm: "));
if (inYear%4==0) {
    if (inYear%100!=0)
        alert("Đây là năm nhuận");
    else if (inYear%400==0)
            alert("Đây là năm nhuận");
        else
            alert("Đây không phải năm nhuận");
}
else
    alert("Đây không phải năm nhuận");
