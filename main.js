import { BulletController } from "./classes/bulletController.js";
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
    this.currentLevel = 1;
    this.bulletController = new BulletController(this);
    this.player = new Player(this, 500, 600, this.bulletController);
    this.map = new Map(this);
  }
  update(gameSpeed, frameTimeDelta) {
    this.map.update(this.currentLevel);
    this.player.update(gameSpeed, frameTimeDelta, this.currentLevel);
  }
  draw(ctx) {
    this.map.draw(ctx, this.currentLevel);
    this.player.draw(ctx);
    this.bulletController.draw(ctx);
  }
}

const game = new Game(canvas.width, canvas.height);

//game loop function using delta time to calculate frame time
function animate(currentTime) {
  if (previouseTime === currentTime) {
    previouseTime = currentTime;
    requestAnimationFrame(animate);
    return;
  }

  const frameTimeDelta = currentTime - previouseTime;
  previouseTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //placeholder color
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  game.update(gameSpeed, frameTimeDelta);
  game.draw(ctx);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
