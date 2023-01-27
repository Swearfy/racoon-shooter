import { Map } from "./classes/maps.js";
import { Player } from "./classes/player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;
let previouseTime = null;
const gameSpeed = 0.2;

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this, canvas.width / 2, canvas.height / 2);
    this.map = new Map();
    this.currentLevel = 1;
  }
  update(gameSpeed, frameTimeDelta) {
    this.map.update(this.currentLevel);
    this.player.update(gameSpeed, frameTimeDelta);
  }
  draw(ctx) {
    this.map.draw(ctx);
    this.player.draw(ctx);
  }
}

const game = new Game(canvas.width, canvas.height);

function animate(currentTime) {
  if (previouseTime === currentTime) {
    previouseTime = currentTime;
    requestAnimationFrame(animate);
    return;
  }

  const frameTimeDelta = currentTime - previouseTime;
  previouseTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  game.update(gameSpeed, frameTimeDelta);
  game.draw(ctx);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
