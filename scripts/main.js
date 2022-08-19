console.log('document loaded');

//grab canvas and declare context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//define out varibles up here at the top
const canvasSize = 600;
const gridSize = 20;

//resize canvas
canvas.height = canvasSize;
canvas.width = canvasSize;
//fill background
ctx.fillStyle = 'black';
ctx.fillRect(0,0,canvasSize,canvasSize);

//draw a snake head
ctx.fillStyle = 'green';
ctx.strokeStyle = 'white';
ctx.fillRect(3*gridSize, 3*gridSize, gridSize, gridSize);
ctx.strokeRect(3*gridSize, 3*gridSize, gridSize, gridSize);
