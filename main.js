import { Input } from "./scripts/utils/input.js";
import { Player } from "./scripts/classes/player.js";
import { Enemy } from "./scripts/classes/enemy.js";
import { playerMovement } from "./scripts/utils/movement.js";
import { playerShooting } from "./scripts/utils/shooting.js";
import { Grid } from "./scripts/utils/grid.js";
import { level_1 } from "./assets/tilemaps/level-1.js";

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

    this.level1 = new Grid();
    this.level1.makeGrid(level_1, 30);
    this.player = new Player(this, 500, 600, this.level);
    this.input = new Input();
    this.input.inputControl(this.input.player1Keys);

    this.enemy = new Enemy(this);

    this.bullets = [];

    console.table(this.level1);
    console.log(this.level1.grid[1][1]);
    console.log(this.level1.searchTilesInRange(1, 1, 1, 1));
  }
  update(fps) {
    this.player.update(fps);

    playerMovement(this.player, this.input.player1Keys);
    playerShooting(this.player, this.input.player1Keys);
    this.input.controllerInput(this.input.player1Keys);

    // this.enemy.update(fps, this.player);

    this.bullets.forEach((bullet) => {
      bullet.update(fps);
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
  draw(ctx) {
    this.player.draw(ctx);

    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });

    // this.enemy.draw(ctx);
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
