//Script for index.html

//my_Canvas Defaults
const my_canvas = document.querySelector("#draw");

const ctx = my_canvas.getContext("2d");
my_canvas.width = window.innerWidth-50;
my_canvas.height = window.innerHeight-100;

//create gradient
var grd = ctx.createLinearGradient(0,0,my_canvas.width,my_canvas.height);
grd.addColorStop(0,"red");
grd.addColorStop(.1,"orange");
grd.addColorStop(.2,"yellow");
grd.addColorStop(.3,"green");
grd.addColorStop(.4,"blue");
grd.addColorStop(.5,"purple");
grd.addColorStop(.6,"red");
grd.addColorStop(.7,"orange");
grd.addColorStop(.8,"yellow");
grd.addColorStop(.9,"green");
grd.addColorStop(1,"blue");
// grd.addColorStop(1,"purple");
// grd.addColorStop(12,);
// grd.addColorStop(13,);
// grd.addColorStop(14,);

ctx.fillStyle = grd;
ctx.fillRect(0, 0, my_canvas.width, my_canvas.height);
// ctx.fill();
ctx.strokeStyle = "#BADA55";
ctx.shadowBlur = 1;
ctx.shadowColor = "black"
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 5;
ctx.globalCompositeOperation = "destination-out";

var strokeSize = 5;
var isDrawing = false;
var points = [];
var lines = [];
var oldLines = [];

function draw(e) {
	if(!isDrawing) return;
	oldLines.length = 0;
	points.push({x:e.offsetX, y:e.offsetY});
	if(points.length%10===0){
		ctx.lineWidth = getVariableWidth(Number(strokeSize)-1, Number(strokeSize)+1);
	}
	console.log("Line width: "+ctx.lineWidth)

	ctx.beginPath();
	ctx.moveTo(points[points.length-2].x, points[points.length-2].y);
	ctx.lineTo(points[points.length-1].x, points[points.length-1].y);
	ctx.stroke();
}

function getVariableWidth(strokeSize){
	// var x = Math.ceil(Math.random()*3)*(strokeSize/10) * strokeSize - strokeSize/10;
	// switch ( Math.ceil(Math.random()*3) ) {
	// 	case 1:
	// 		console.log("case 1")
	// 		return strokeSize - 1;
	// 	case 2:
	// 		console.log("case 2")
	// 		return strokeSize;
	// 	case 3:
	// 		console.log("case 3")
	// 		return strokeSize + 1;
	// 	default:
	// 		return strokeSize;
	// }
	var x = strokeSize + Math.floor(Math.random()*3)-1;
	console.log(x)
	return x;
	// return Math.random() * strokeSize/5 * 2 + strokeSize - strokeSize/5;
}

function drawLine (line) {
	ctx.beginPath();
	ctx.moveTo(line[0].x, line[0].y);
	for (point in line.slice(1)){
		ctx.lineTo(point.x, point.y);
	}
	ctx.stroke();
}

function redraw() {
	clearmy_Canvas();
	for (line in lines){
		drawLine(line);
	}
}

function changeStrokeSize(){
  strokeSize = this.value;
  console.log(strokeSize);
  ctx.lineWidth = strokeSize;
  // ctx.shadowBlur = this.value/15;
}

function clearmy_Canvas() {
	ctx.clearRect(0, 0, ctx.my_canvas.width, ctx.my_canvas.height);
	// ctx.clear();
	// ctx.fillRect(0, 0, my_canvas.width, my_canvas.height);
	// ctx.fill();
}

function stopDrawing() {
	isDrawing = false;
	lines.push(points);
	points.length = 0;
}

function popLine() {
	console.log("hi");
	oldLines.push(lines.pop());
	redraw()
}

function pushLine () {
	lines.push(oldLines.pop());
	redraw()
}

function savePicture () {
	var image = my_canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	window.location.href=image;
}

function setRandomRainbow(){
	colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
	document.documentElement.style.setProperty(`--randomRainbow`, colors[Math.floor(Math.random() * 7 + 1)])
}

//Event Listeners
my_canvas.addEventListener("mousemove", draw);
my_canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	points.push({x:e.offsetX, y:e.offsetY});
});
my_canvas.addEventListener("mouseup", stopDrawing);
my_canvas.addEventListener("mouseout", stopDrawing);

const size_selector = document.querySelector("input#size");
size_selector.addEventListener("change", changeStrokeSize);

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("mouseover", setRandomRainbow));

const undo_button = document.querySelector("button#undo");
undo_button.addEventListener("mousedown", popLine);

const redo_button = document.querySelector("button#redo");
redo_button.addEventListener("mousedown", pushLine);

const save_button = document.querySelector("button#save");
save_button.addEventListener("mousedown", savePicture);

const clear_button = document.querySelector("button#clear");
clear_button.addEventListener("mousedown", clearmy_Canvas);

const title = document.querySelector("#title");
title.addEventListener("mouseover", setRandomRainbow);
title.addEventListener("mousedown", setRandomRainbow);
