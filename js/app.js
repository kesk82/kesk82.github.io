const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const bg = document.getElementById("canvasBG");
const bgWidth = bg.naturalWidth;
const bgHeight = bg.naturalHeight;

const logo = document.getElementById("canvasLogo");

const logoPosOutput = document.getElementById("logoPosOutput");
const mergeButton = document.getElementById("mergeButton");

const canvasWidth = 800;
const canvasheight = canvasWidth * (bg.naturalHeight/bg.naturalWidth);

const logoStartWidth = 120;
const logoStartheight = logoStartWidth *(logo.naturalHeight/logo.naturalWidth);

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasheight;

const rect = {
  startX: 20,
  startY: 20,
  w: logoStartWidth,
  h: logoStartheight
};

let drawLogo = false;
let move = false;
let resize = false;

let lastMouseX = false;
let lastMouseY = false;

mergeButton.addEventListener("click", function() {
  console.log(rect);
  const realStartX = parseInt(rect.startX/canvasWidth*bgWidth);
  const realStartY = parseInt(rect.startY/canvasWidth*bgWidth);
  const realWidth = parseInt(rect.w/canvasWidth*bgWidth);
  const realHeight = parseInt(rect.h/canvasWidth*bgWidth);
  //window.location.href=`merge.php?posx=${realStartX}&posy=${realStartY}&width=${realWidth}&height=${realHeight}`;
  window.open(`merge.php?posx=${realStartX}&posy=${realStartY}&width=${realWidth}&height=${realHeight}`); 
});

function draw() {
  ctx.beginPath();
  
  ctx.lineWidth = 10;
  ctx.strokeStyle = "red";
  ctx.lineCap = "round";
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.rect(rect.startX, rect.startY, rect.w, rect.h);
  ctx.drawImage(logo, rect.startX, rect.startY, rect.w, rect.h);
  ctx.stroke();
  logoPosOutput.textContent = `Logo position: ${rect.startX}, ${rect.startY}, width: ${rect.w}, height: ${rect.h}`;
}

if (bg.complete) {
  draw();
}

if (logo.complete) {
  draw();
}

bg.addEventListener('load', draw);
logo.addEventListener('load', draw);

function mouseDown(e) {
  newStartX = e.pageX - this.offsetLeft;
  newStartY = e.pageY - this.offsetTop;

  // find click on corners/borders and resize!

  if (
    (newStartX >= rect.startX && newStartX < rect.startX+rect.w) &&
    (newStartY >= rect.startY && newStartY < rect.startY+rect.h)
  ) {
    move = true;
  } else {
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drawLogo = true;
  }
}

function mouseUp(e) {
  drawLogo = false;
  move = false;
  resize = false;
  lastMouseX = false;
  lastMouseY = false;
}

function mouseMove(e) {

  if (lastMouseX === false || lastMouseY === false) {
    lastMouseX = e.pageX;
    lastMouseY = e.pageY;
    return;
  }

  let xMoveDiff = lastMouseX - e.pageX;
  let yMoveDiff = lastMouseY - e.pageY;

  lastMouseX = e.pageX;
  lastMouseY = e.pageY;

  if (drawLogo) {
    rect.w = Math.abs((e.pageX - this.offsetLeft) - rect.startX);
    // rect.h = (e.pageY - this.offsetTop) - rect.startY;
    rect.h = rect.w * (logo.naturalHeight/logo.naturalWidth);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
  }
  if (move) {
    rect.startX = rect.startX - xMoveDiff;
    rect.startY = rect.startY - yMoveDiff;
    draw();
  }
}

canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", mouseUp, false);
canvas.addEventListener("mousemove", mouseMove, false);