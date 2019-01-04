// Stack Canvas variable
const stack = document.getElementById('stack-canvas')
// 2d drawable variables on stack canvas

const draw = stack.getContext('2d');
const arrow = stack.getContext('2d');
const inorderLine = stack.getContext('2d');

stack.width = window.innerWidth;
stack.height = window.innerHeight;

// stack box

draw.beginPath();               
draw.moveTo(550,150);
draw.lineTo(550, 650);
draw.lineTo(900,650);
draw.lineTo(900,150);               

draw.strokeStyle = "#1935E8";

//top counter box

draw.strokeRect(1300,80,150,150);   

draw.font = "72px Arial";           

//top Counter initial 

draw.fillText("-1", 1335,185);
draw.stroke();

draw.strokeStyle = "#1935E8";

//Element box

draw.strokeRect(100,80,150,150);   

draw.fillStyle = "black";
draw.font = "28px Arial";

//Element text

draw.fillText("Element", 120, 260);   

draw.stroke();

arrow.font = "26px Arial";

//top text

arrow.fillText("Top Counter", 1300, 260);   

arrow.strokeStyle = "blue";

// arrow

arrow.beginPath();                  
arrow.moveTo(300, 650);
arrow.lineTo(450,650);
arrow.lineTo(425,625);
arrow.lineTo(450,650);
arrow.lineTo(425,675);
arrow.stroke();

// inOrder separtion line on stack canvas
inorderLine.fillStyle = "black";
inorderLine.beginPath();
inorderLine.moveTo(0,685);
inorderLine.lineTo(stack.width, 685);
inorderLine.stroke();

// inorder Traversal text under inOrder separtion line
inorderLine.font = "36px Arial";
inorderLine.fillText("Inorder Traversal: ", 20, 730);

// stack Visualization Paused 
function pau(){
    window.setTimeout(window.alert, 0.2, 'Visualization is Paused');
}