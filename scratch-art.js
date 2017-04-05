//Script for index.html

//Canvas Defaults
const canvas = document.querySelector("#draw");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth-50;
canvas.height = window.innerHeight-100;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
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
	if(points.length%3===0){
		ctx.lineWidth = getVariableWidth(Number(strokeSize)-1, Number(strokeSize)+1);
	}
	console.log("Line width: "+ctx.lineWidth)

	ctx.beginPath();
	ctx.moveTo(points[points.length-2].x, points[points.length-2].y);
	ctx.lineTo(points[points.length-1].x, points[points.length-1].y);
	ctx.stroke();
}

function getVariableWidth(strokeSize){
	return Math.random() * strokeSize/5 * 2 + strokeSize - strokeSize/5;
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
	clearCanvas();
	for (line in lines){
		drawLine(line);
	}
}

function changeStrokeSize(){
  strokeSize = this.value;
  console.log(strokeSize)
  // ctx.shadowBlur = this.value/15;
}

function clearCanvas() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// ctx.clear();
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
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
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	window.location.href=image; 
}

function setRandomRainbow(){
	colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
	document.documentElement.style.setProperty(`--randomRainbow`, colors[Math.floor(Math.random() * 7 + 1)])
}

//Event Listeners
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	points.push({x:e.offsetX, y:e.offsetY});
});
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

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
clear_button.addEventListener("mousedown", clearCanvas);

const title = document.querySelector("#title");
title.addEventListener("mouseover", setRandomRainbow);
title.addEventListener("mousedown", setRandomRainbow);
