let canvas;
let ctx;
let height;
let width;

let isDown;
let x = 0;
let y = 0;

init();
draw();
addListeners();

function init () {
  canvas = document.getElementById('derCanvas');
  ctx = canvas.getContext('2d');

  height = window.innerHeight;
  width = window.innerWidth;

  canvas.width = width;
  canvas.height = height;
}

function draw () {
  ctx.clearRect(0, 0, width, height);

  new RoundedSquare(x, y, 100, 100, 10).draw();
}

function addListeners () {
  canvas.addEventListener('mousemove',
    function (e) {
      if (isDown) {
        x = e.offsetX;
        y = e.offsetY;
        draw();
      }
    }, false);

  canvas.addEventListener('mouseup',
    function () {
      isDown = false;
    }, false);

  canvas.addEventListener('mousedown',
    function () {
      isDown = true;
    }, false);

  canvas.addEventListener('mouseout', function (e) {
    isDown = false;
  }, false);
}

function RoundedSquare (x, y, widht, height, radio) {
  this.x = x;
  this.y = y;
  this.widith = widht;
  this.height = height;
  this.radius = radio;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, Math.PI, -1 * Math.PI / 2);
    ctx.lineTo(this.x + this.radius + this.widith, this.y);

    ctx.arc(this.x + this.radius + this.widith, this.y + this.radius, this.radius, -1 * Math.PI / 2, 0);
    ctx.lineTo(this.x + (this.radius * 2) + this.widith, this.y + this.height);

    ctx.arc(this.x + this.radius + this.widith, this.y + this.height + this.radius, this.radius, 0, Math.PI / 2);
    ctx.lineTo(this.x + this.radius, this.y + this.height + (this.radius * 2));

    ctx.arc(this.x + this.radius, this.y + this.height + this.radius, this.radius, Math.PI / 2, Math.PI);
    ctx.lineTo(this.x, this.y + this.radius);

    ctx.fill();
    ctx.closePath();
  };
}