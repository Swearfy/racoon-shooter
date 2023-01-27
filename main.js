import { MapSprite } from "./classes/maps.js";
import { Player } from "./classes/player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;
let previouseTime = null;
const gameSpeed = 0.2;

const level1 = new MapSprite({
  position: {
    x: 0,
    y: 0,
  },
  image: "./img/map1resolutionfix.png",
});

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.background = level1;
    this.player = new Player(this, canvas.width / 2, canvas.height / 2);
  }
  update(gameSpeed, frameTimeDelta) {
    this.player.update(gameSpeed, frameTimeDelta);
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.player.draw(ctx);
  }
}

const game = new Game(canvas.width, canvas.height);

function animate(currentTime) {
  if (previouseTime === currentTime) {
    previouseTime = current;
    requestAnimationFrame(animate);
    return;
  }

  const frameTimeDelta = currentTime - previouseTime;
  previouseTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.update(gameSpeed, frameTimeDelta);
  game.draw(ctx);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
