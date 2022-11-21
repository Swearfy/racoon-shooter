import { Player } from "./classes/player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
  }
  update() {}
  draw() {}
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

requestAnimationFrame(animate);
