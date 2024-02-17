const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const bg = document.getElementById("canvasBG");
const logo = document.getElementById("canvasLogo");

console.log(bg.naturalWidth, bg.naturalHeight);

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

function draw() {
  ctx.beginPath();
  
  ctx.lineWidth = 10;
  ctx.strokeStyle = "red";
  ctx.lineCap = "round";
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.rect(rect.startX, rect.startY, rect.w, rect.h);
  ctx.drawImage(logo, rect.startX, rect.startY, rect.w, rect.h);
  ctx.stroke();
  console.log(rect.startX, rect.startY, rect.w, rect.h);
}

draw();

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