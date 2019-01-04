// tree canvas Variables
const treeCanvas = document.getElementById('tree-canvas');
const stackCanvas = document.getElementById('stack-canvas');

treeCanvas.width = window.innerWidth / 2;
treeCanvas.height = window.innerHeight;

// 2d drawable variables on tree canvas

const circleTree = treeCanvas.getContext('2d');
const element = treeCanvas.getContext('2d');
const line = treeCanvas.getContext('2d');
const stackVis = stackCanvas.getContext('2d');

//2d drawable variable properties

element.font = "24px Arial"
circleTree.strokeStyle = "black";
line.strokeStyle = "black";

// tree node circle radius

var radius = 30;

// tree visualization 1st level checker variable

var level = {
    left: 1,
    right: 1,
};

// x, y co-ordinates of stackVisualtion()

var xAxis = 560;
var yAxis = 570;
var elePos_Y_Axis = 630; 

// x, y co-ordinates of Arrows on stack
// usage at arrowVisualize()
var arrowLine_X_Axis = 300;
var arrowLine_Y_Axis = 650; 

// x, y coordinates of inOrder element visualize
// usage elementInorderVisualize

var inorderVis_x_pos = 350;
var inorderVis_y_pos = 730;

//class Node

class Node{
    constructor(value){
        this.data = value;
        this.next = null;
        this.left = null;
        this.right = null;
        this.x_pos = null;
        this.y_pos = null;
    }
}

//class stack (implimented by linked list)

class Stack{ 
    constructor(){ 
        var top = new Node();
        this.count = -1;
        this.size = 10;
    }
    // push value in a tree
    // insert at first pos

    async push(newNode){
        if(this.isFull() == false){                      //insert at first position
            if(this.top == null){           
                this.top = newNode;
                await elementBoxVisualize(this.top.data);
                stackVisualize(this.top.data, "push");
                arrowVisualize("push");
                this.count++;
                topEleVisualize(this.count);
            }
            else{
                newNode.next = this.top;
                this.top = newNode;
                await elementBoxVisualize(this.top.data);
                stackVisualize(this.top.data, "push");
                arrowVisualize("push");
                this.count++;
                topEleVisualize(this.count);
            }
        }
        else{
            console.log("Stack Full");
        }
    }

    // pop value from the tree
    // delete from first pos

    async pop(){
        if(this.isEmpty() == false){
            var toRemove = this.top;
            this.top = this.top.next;
            stackVisualize(toRemove.data, "pop");
            arrowVisualize("pop");
            this.count--;
            topEleVisualize(this.count);
            return toRemove;
        }
        else{
            console.log("Stack Empty");
        }
    }

    isEmpty(){

        if(this.count == -1){
            return true;
        } 
        else{
            return false;
        }
    } 

    isFull(){
        if(this.count == this.size - 1){
            return true;
        }
        else{
            return false;
        }
    }
};

// class BST tree (implimented by linkedlist)

class Tree{
    constructor(){
        var root = new Node();
        this.root = null;
    }

    //insert node in a BST tree

    insert(value){
        var node = new Node();
        if(!this.root){
            var temp = new Node(value);
            this.root = temp;
            
            this.root.x_pos = treeCanvas.width / 2;
            this.root.y_pos = 70;

            drawTree(this.root.x_pos, this.root.y_pos);
            drawValue(this.root.x_pos - 8, this.root.y_pos + 8, this.root.data);
            console.log("Root insert: " + this.root.data);   
        }
        else{
            node = this.insertNode(this.root, value);
        }
        return node;
    }

    // insertNode,a recursive function, calculates
    // the postion of the node to be inserted
    // in the tree

    insertNode(root, value){
        var newNode = new Node(value);

        if(root.data == value){
            console.log("Already Exist");
            return;
        }
        else if(value < root.data){
            if(!root.left){
                root.left = newNode;
                if(level.left == 1){
                    root.left.x_pos = root.x_pos /1.3; 
                    root.left.y_pos = root.y_pos + 70;
                    drawTree(root.left.x_pos, root.left.y_pos);
                    drawValue(root.left.x_pos - 8, root.left.y_pos + 8, root.left.data);
                    drawLine(root.x_pos - 30, root.y_pos + 10, root.left.x_pos + 20, root.left.y_pos - 20);
                    level.left = null;
                }
                else{
                    root.left.x_pos = root.x_pos - 50; 
                    root.left.y_pos = root.y_pos + 100;
                    drawTree(root.left.x_pos, root.left.y_pos);
                    drawValue(root.left.x_pos - 8, root.left.y_pos + 8, root.left.data);
                    drawLine(root.x_pos - 5, root.y_pos + 30, root.left.x_pos + 10, root.left.y_pos - 30);
                }
                console.log("left insert: " + root.left.data);
                return root.left;
            }
            else{
                this.insertNode(root.left, value);
            }
        }
        else if(value > root.data){
            if(!root.right){
                root.right = newNode;
                if(level.right == 1){
                    var temp = treeCanvas.width / 2 - root.x_pos / 1.3;
                    root.right.x_pos = temp + treeCanvas.width / 2;
                    root.right.y_pos = root.y_pos + 70;
                    drawTree(root.right.x_pos, root.right.y_pos);
                    drawValue(root.right.x_pos - 8, root.right.y_pos + 8, root.right.data);
                    drawLine(root.x_pos + 30, root.y_pos + 10, root.right.x_pos - 20, root.right.y_pos - 20);
                    level.right = null;
                }
                else{
                    root.right.x_pos = root.x_pos + 50;
                    root.right.y_pos = root.y_pos + 100;
                    drawTree(root.right.x_pos, root.right.y_pos);
                    drawValue(root.right.x_pos - 8, root.right.y_pos + 8, root.right.data);
                    drawLine(root.x_pos - 5, root.y_pos + 30, root.right.x_pos - 10, root.right.y_pos - 30);
                }
                console.log("right insert: " + root.right.data);
                return root.right;
                
            }
            else{
                this.insertNode(root.right, value);
            }
        }
    }

    // inOrder traversal in the BST
    // pushing and poping in stack 

    async inOrder(root){
        var stack = new Stack();

        while(this.root != null || stack.isEmpty() == false){
            if(this.root != null){
                await stack.push(this.root);
                this.root = this.root.left;
            }
            else{
                this.root = await stack.pop();
                elementInorderVisualize(this.root.data);
                console.log("inorder: " + this.root.data);
                this.root = this.root.right;
            }
        }
    }
};

// tree object created of Tree class;

var tree = new Tree();

/* Tree Visualizting Functions */

// insertTree, get the input value from inputBpx
// and insert in the BST 

function insertTree(){
    var val = document.getElementById('insertValue').value;
    //console.log(typeof(val));
    val = Number(val);
    //console.log(typeof(val));
    tree.insert(val);
    document.getElementById('insertValue').value = "";
}

// traversalInorder, call the inOrder function of
// class BST tree

function traversalInorder(){

    tree.inOrder(tree.root);
}

// drawTree, takes x and y co-ordinates
// to draw the circle nodes of inserted value
// in BST, in Tree canvas.

function drawTree(x, y){
    circleTree.beginPath();
    circleTree.arc(x, y, radius,
        0, Math.PI * 2, false);
        
    circleTree.stroke();
}

// drawLine, takes coordiantes of source
// (from_x, from_y), coordiantes of 
// destination, and joins the insertedNode
// with it's parent node.

function drawLine(from_x, from_y, to_x, to_y){
    line.beginPath();
    line.moveTo(from_x, from_y);
    line.lineTo(to_x, to_y);
    line.stroke();
}

// draw Value, takes a value to be printed at
// x and y coordinates inside the circle 
// [ drawCircle() ] of a respective Node.

function drawValue(x, y, value){
    var str = value + "";
    element.fillText(str, x, y, 50 );
    element.stroke();
}

// stackVisualiation, takes a ele to be printed
// inside stackBox or removed from stackBox based 
// on the decision which is either "push" or "pop"

function stackVisualize(ele, decision){

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

// elementBoxVisualize, takes a ele to be printed
// inside elementBox at a fixed x, y coordinates

function elementBoxVisualize(ele){
    var eleVis = stackCanvas.getContext('2d');
    eleVis.font = "65px Arial";
    eleVis.fillStyle = "black";
    eleVis.fillText(ele,150,170);
    //consoleconsole.log(ele);

    return new Promise(function(resolve) {
        setTimeout(function(){ 
            eleVis.clearRect(110,90,120,120);
            resolve();
        }, 2000);
    });
}

// arrowVisualize, takes a decision to determine
// whether to move the arrow up when ele entered is
// "push" in stack, or to move the arrow down when
// ele is "pop" from stack.
// x axis is fixed while y moves

function arrowVisualize(decision){
    const arrow = stackCanvas.getContext('2d');
    arrow.font = "26px Arial";
    arrow.clearRect(arrowLine_X_Axis,arrowLine_Y_Axis - 100,150,125);
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

// topEleVisualize, takes a value indicating the
// size of stack, prints the value inside topEleBox
// which is at fixed x, y coordinates.

function topEleVisualize(value){
    const topEle = stackCanvas.getContext('2d'); 
    topEle.clearRect(1310,90,130,130);

    var str = '' + value;
    topEle.fillStyle = "black";
    topEle.font = "72px Arial";

    topEle.fillText(str,1350,185);
    topEle.stroke();
}

// elementInorderVisualize, takes a ele to be
// printed under the Inorder Traversal line at
// a fixed y position while x position varies.

function elementInorderVisualize(ele){
    const inorder_ele_Vis = stackCanvas.getContext('2d'); 
    inorder_ele_Vis.fillStyle = "black";
    inorder_ele_Vis.font = "36px Arial";
    var str = "" + ele + ",";
    inorder_ele_Vis.fillText(str, inorderVis_x_pos, inorderVis_y_pos);
    arrow.stroke();

    inorderVis_x_pos = inorderVis_x_pos + 70;
}