import { Bullet } from "./classes/bullet.js";
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
    this.bullets = [];
    this.input.inputControl(this.input.player1Keys);
  }
  update(fps) {
    this.player.update(fps);
    this.playerMovment(this.player, this.input.player1Keys);
    this.playerShooting(this.player, this.input.player1Keys);
    this.level.update(this.player);

    this.bullets.forEach((bullet) => {
      if (
        bullet.y <= -bullet.height ||
        bullet.y >= this.height ||
        bullet.x <= -bullet.width ||
        bullet.x >= this.width
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
    let x = keys.left.pressed ? -2 : keys.right.pressed ? 2 : 0;
    let y = keys.up.pressed ? -2 : keys.down.pressed ? 2 : 0;

    player.move(x, y);
  }
  playerShooting(player, keys) {
    let velX = keys.shootLeft.pressed ? -2 : keys.shootRight.pressed ? 2 : 0;
    let velY = keys.shootUp.pressed ? -2 : keys.shootDown.pressed ? 2 : 0;
    if (velX != 0 || velY != 0) {
      this.bullets.push(
        new Bullet(
          player.x + player.width / 2,
          player.y + player.height / 2.3,
          velX,
          velY,
          1
        )
      );
    }
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
