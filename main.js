import { Input } from "./classes/input.js";
import { Level } from "./classes/level1.js";
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

    this.player = new Player(this, 500, 600);
    this.player2 = new Player(this, 500, 300);
    this.input = new Input(this);
    this.Level = new Level(this);
  }
  update(fps) {
    this.Level.update();
    this.player.update(fps, this.currentLevel);
    this.controlls(this.input.p1Keys, this.player);
    this.player2.update(fps, this.currentLevel);
    this.controlls(this.input.p2Keys, this.player2);
  }

  draw(ctx) {
    this.Level.draw(ctx);
    this.player.draw(ctx);
    this.player2.draw(ctx);
  }
  checkCollision(obj1, obj2) {
    if (
      obj2.x > obj1.width + obj1.x ||
      obj1.x > obj2.width + obj2.x ||
      obj2.y > obj1.height + obj1.y ||
      obj1.y > obj2.height + obj2.y
    ) {
      return false;
    }
    return true;
  }
  controlls(input, player) {
    // player.maxSpeed = player.maxSpeed * 0.71;
    let up = input[Object.keys(input)[0]];
    let down = input[Object.keys(input)[1]];
    let left = input[Object.keys(input)[2]];
    let right = input[Object.keys(input)[3]];

    let shootup = input[Object.keys(input)[4]];
    let shootdown = input[Object.keys(input)[5]];
    let shootleft = input[Object.keys(input)[6]];
    let shootright = input[Object.keys(input)[7]];

    //player movment

    player.move(left ? -2 : right ? 2 : 0, up ? -2 : down ? 2 : 0);

    // player shooting

    shootup && shootleft
      ? player.shot(-2, -2, 1)
      : shootup && shootright
      ? player.shot(2, -2, 1)
      : shootdown && shootleft
      ? player.shot(-2, 2, 1)
      : shootdown && shootright
      ? player.shot(2, 2, 1)
      : shootup
      ? player.shot(0, -2, 1)
      : shootdown
      ? player.shot(0, 2, 1)
      : shootleft
      ? player.shot(-2, 0, 1)
      : shootright
      ? player.shot(2, 0, 1)
      : "return";
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
  let fps = gameSpeed * frameTimeDelta;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //placeholder color
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  game.update(fps);
  game.draw(ctx);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
