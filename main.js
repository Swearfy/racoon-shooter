import { Input } from "./classes/input.js";
import { Level } from "./classes/level.js";
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

    this.level = new Level(this);
    this.player = new Player(this, 500, 600, this.level);

    this.input = new Input();

    this.input.inputControl(this.input.player1Keys);

    this.bullets = [];
  }
  update(fps) {
    this.player.update(fps);

    this.playerMovment(this.player, this.input.player1Keys);
    this.playerShooting(this.player, this.input.player1Keys);

    this.level.update(this.player);

    this.bullets.forEach((bullet) => {
      this.level.checkX(bullet);
      this.level.checkY(bullet);

      if (
        bullet.y <= -bullet.height ||
        bullet.y >= this.height ||
        bullet.x <= -bullet.width ||
        bullet.x >= this.width ||
        bullet.collide === true
      ) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
        return;
      }
    });
  }
  draw(ctx, player) {
    this.level.draw(ctx, player);
    this.player.draw(ctx);

    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
  }
  playerMovment(player, keys) {
    let playerSpeed = 2;

    if (
      (keys.up.pressed || keys.down.pressed) &&
      (keys.left.pressed || keys.right.pressed)
    ) {
      playerSpeed = playerSpeed * 0.71;
    }

    let x = keys.left.pressed
      ? -playerSpeed
      : keys.right.pressed
      ? playerSpeed
      : 0;
    let y = keys.up.pressed
      ? -playerSpeed
      : keys.down.pressed
      ? playerSpeed
      : 0;

    player.move(x, y);
  }
  playerShooting(player, keys) {
    let bulletSpeed = 4;

    if (
      (keys.shootUp.pressed || keys.shootDown.pressed) &&
      (keys.shootLeft.pressed || keys.shootRight.pressed)
    ) {
      bulletSpeed = bulletSpeed * 0.71;
    }

    let velX = keys.shootLeft.pressed
      ? -bulletSpeed
      : keys.shootRight.pressed
      ? bulletSpeed
      : 0;
    let velY = keys.shootUp.pressed
      ? -bulletSpeed
      : keys.shootDown.pressed
      ? bulletSpeed
      : 0;

    player.shoot(velX, velY);
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
  game.draw(ctx, game.player);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
