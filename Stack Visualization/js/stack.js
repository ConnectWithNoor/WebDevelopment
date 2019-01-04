class Stack{ 
    constructor(){ 
        this.items = []; 
        this.top = -1;
    }

    push(element){ 
        stackVisualize(element, "push");
        arrowVisualize("push");
        this.top++;
        topEleVisualize();
        this.items.push(element); 
    } 

    isEmpty(){

        return this.items.length == 0; 
    } 

    topEle(){  
        return this.items[this.items.length - 1]; 
    } 

    pop(){ 
        if (this.isEmpty() == false)
            if(this.topEle() == '('){
                stackVisualize(this.topEle(), "pop");
                arrowVisualize("pop");
                this.top--;
                topEleVisualize();
                this.items.length=this.items.length-1;
            }
            else{
                stackVisualize(this.topEle(), "pop"); 
                arrowVisualize("pop");
                this.top--;
                topEleVisualize();
                var post = document.getElementById('postfix').value;
                post = post + this.items.pop(); 
                document.getElementById('postfix').value = post;
            }
        return "Underflow";         
    } 

    printStack(){ 
        var post = document.getElementById('postfix').value;
         
        var str = ""; 
        for (var i=this.items.length-1 ; i>=0  ; i--){ 
            str += this.items[i];
            this.pop(this.topEle());
	} 
        post = post + str;
        return post;
    } 

    Prec(ch){
        switch(ch){
            case '+':
            case '-':
                return 1;
            case '*': 
            case '/': 
            case '%':
                return 2;   
            case '^':
                return 3;               
            default:
                return -1;
        }
    }
    async postFix(exp){ 
        for(var i = 0; i < exp.length ; i++){
            var c = exp[i];
            if((c>='0' && c<='9') || (c>='A' && c<='Z') || (c>='a' && c<='z')){
                await elementVisualize(c);

                var post = document.getElementById('postfix').value;
                post = post + c; 
                document.getElementById('postfix').value = post;

            }
            else if(c == '('){
                await elementVisualize(c);
                this.push(c);
            }
        
            else if(c == ')'){
                while(this.topEle() != '('){
                    await elementVisualize(c);
                    this.pop(this.topEle());                
                }
                this.pop(this.topEle());
                this.pop(this.topEle());
            }
            else{
                if(this.isEmpty() == true){
                    await elementVisualize(c);
                    this.push(c);
                }
            
                else if(this.topEle() == '('){
                   await elementVisualize(c);
                    this.push(c);
                }
            
                else if( this.Prec(c) > this.Prec(this.topEle()) ){
                   await elementVisualize(c);
                    this.push(c);
                }
            
                else{
                    this.pop();
                    await elementVisualize(c);                   
                    this.push(c);
                }
            }
        }
        document.getElementById('postfix').value = this.printStack();
    }
}


var stack = new Stack();
function convert(e){
    document.getElementById('postfix').value = "";
    var x = document.getElementById('infix').value;
    stack.postFix(x);
}

function elementVisualize(ele){
    var eleVis = canvas.getContext('2d');
    eleVis.font = "65px Arial";
    eleVis.fillStyle = "black";
    eleVis.fillText(ele,150,170);
    //consoleconsole.log(ele);

    return new Promise(function(resolve) {
        setTimeout(function(){ 
            eleVis.clearRect(110,90,100,120);
            resolve();
        }, 2000);
    });
}

var xAxis = 560;
var yAxis = 570;
var elePos_Y_Axis = 630; 

function stackVisualize(ele, decision){
    var stackVis = canvas.getContext('2d');

    if (decision == "push"){
        stackVis.fillStyle = "blue";
        stackVis.fillRect(xAxis, yAxis, 330, 70);
        stackVis.fillStyle = "white";
        stackVis.font = "65px Arial";
        stackVis.fillText(ele, 700, elePos_Y_Axis);

        yAxis = yAxis - 80;
        elePos_Y_Axis = elePos_Y_Axis - 80;
    }
    
    if (decision == "pop"){
        yAxis = yAxis + 80;
        elePos_Y_Axis = elePos_Y_Axis + 80;
        stackVis.clearRect(xAxis, yAxis, 330, 70);   
    } 
}

var arrowLine_X_Axis = 300;
var arrowLine_Y_Axis = 650; 

function arrowVisualize(decision){
    const arrow = canvas.getContext('2d');
    arrow.font = "26px Arial";
    arrow.clearRect(arrowLine_X_Axis,arrowLine_Y_Axis - 100,150,150);
    arrow.beginPath();

    if(decision == "push"){
        arrow.moveTo(arrowLine_X_Axis, arrowLine_Y_Axis -= 80);
        arrow.lineTo(arrowLine_X_Axis + 150, arrowLine_Y_Axis);
        arrow.lineTo(arrowLine_X_Axis + 125, arrowLine_Y_Axis - 25);
        arrow.lineTo(arrowLine_X_Axis + 150, arrowLine_Y_Axis); 
        arrow.lineTo(arrowLine_X_Axis + 125, arrowLine_Y_Axis + 25)
    }
    else if(decision == "pop"){
        arrow.moveTo(arrowLine_X_Axis, arrowLine_Y_Axis += 80);
        arrow.lineTo(arrowLine_X_Axis + 150, arrowLine_Y_Axis);
        arrow.lineTo(arrowLine_X_Axis + 125, arrowLine_Y_Axis - 25);
        arrow.lineTo(arrowLine_X_Axis + 150, arrowLine_Y_Axis); 
        arrow.lineTo(arrowLine_X_Axis + 125, arrowLine_Y_Axis + 25)
    }
    arrow.stroke();
}

function topEleVisualize(){
    const topEle = canvas.getContext('2d'); 
    topEle.clearRect(1310,90,130,130);

    var num = '' + stack.top;
    topEle.fillStyle = "black";
    topEle.font = "72px Arial";

    topEle.fillText(num,1350,185);
    console.log(num);
    topEle.stroke();
}