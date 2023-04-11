let browser = prompt("Enter browser name!")
switch (browser) {
    case 'Edge':
        alert("Hello Edge Lord!");
        break;
    case 'Chrome':
    case 'Firefox':
    case 'Safari':
    case 'Opera':
        alert('Okay we support these browsers too');
        break;
    default:
        alert('We hope that this page looks ok!');
}
