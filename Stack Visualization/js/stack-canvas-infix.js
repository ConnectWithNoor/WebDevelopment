const canvas = document.querySelector('canvas');
const draw = canvas.getContext('2d');
const arrow = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

draw.beginPath();               // stack box
draw.moveTo(550,150);
draw.lineTo(550, 650);
draw.lineTo(900,650);
draw.lineTo(900,150);               

draw.strokeStyle = "#1935E8";
draw.strokeRect(1300,80,150,150);   //top counter box

//draw.fillStyle = "white";           // top counter box background white
//draw.fillRect(1302,82,146,146);
//draw.fillRect(552, 152, 346, 496); // stack box background white

draw.font = "72px Arial";           //top Counter initial 
draw.fillText("-1", 1335,185);
draw.stroke();

draw.strokeStyle = "#1935E8";
draw.strokeRect(100,80,150,150);   //Element box

//draw.fillStyle = "white";           // top counter box background white
//draw.fillRect(102,82,146,146);

draw.fillStyle = "black";
draw.font = "28px Arial";
draw.fillText("Element", 120, 260);   //Element text

draw.stroke();

arrow.font = "26px Arial";
arrow.fillText("Top Counter", 1300, 260);   //top text

arrow.strokeStyle = "blue";

arrow.beginPath();                  // arrow 
arrow.moveTo(300, 650);
arrow.lineTo(450,650);
arrow.lineTo(425,625);
arrow.lineTo(450,650);
arrow.lineTo(425,675);
arrow.stroke();

// ---- 
function pau(){
    window.setTimeout(window.alert, 0.2, 'Visualization is Paused');
}