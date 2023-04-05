import { Input } from "./scripts/utils/input.js";
import { Player } from "./scripts/classes/player.js";
import { Enemy } from "./scripts/classes/enemy.js";
import { playerMovement } from "./scripts/utils/movement.js";
import { playerShooting } from "./scripts/utils/shooting.js";
import { Grid } from "./scripts/classes/grid.js";
import { level_1 } from "./assets/tilemaps/level-1.js";
import { checkX, checkY } from "./scripts/utils/collision.js";
import { removeFromArray, toIndex } from "./scripts/utils/utils.js";
import { EventEmitter } from "./scripts/utils/eventEmitter.js";
import { Pathfinding } from "./scripts/classes/pathfinding.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;
let previouseTime = null;
const gameSpeed = 0.2;

class Game {
  /**
   * @param width
   * @param height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentLevel = new Grid(30);
    this.input = new Input();
    this.player = new Player(this, 300, 300);
    this.bullets = [];
    this.ee = new EventEmitter();
    this.enemy = new Enemy(this);
    this.pathfinding = new Pathfinding();
    this.currentLevel.makeGrid(level_1);
    this.ee.on("test", this.test);
  }
  test() {
    console.log(
      game.pathfinding.findPath(game.currentLevel.grid, game.enemy, game.player)
    );
  }
  init(player) {
    this.currentLevel.makeGrid(level_1);
    this.input.inputControl(this.input.player1Keys);

    requestAnimationFrame(animate);
  }
  twoPlayerInit(player1, player2) {
    this.currentLevel.makeGrid(level_1);
    this.player = player1;
    this.player2 = player2;
    this.input.inputControl(this.input.player1Keys);

    requestAnimationFrame(animate);
  }
  /**
   * Updates the enemy's player and bullets. This is called every frame to ensure that everything is up to date
   *
   * @param fps - The time in frames since the last update
   */
  update(fps) {
    this.player.update(fps, this.currentLevel);

    if (this.player2) {
      this.player2.update(fps, this.currentLevel);
    }

    if (this.input.player1Keys.down.pressed) {
      this.ee.emit("test");
    }

    playerMovement(this.player, this.input.player1Keys, this.ee);
    playerShooting(this.player, this.input.player1Keys);
    this.input.controllerInput(this.input.player1Keys);

    this.bullets.forEach((bullet) => {
      bullet.update(fps);
      checkX(bullet, this.currentLevel);
      checkY(bullet, this.currentLevel);

      // Removes the bullet from the bullet list.
      if (
        bullet.y <= -bullet.height ||
        bullet.y >= this.height ||
        bullet.x <= -bullet.width ||
        bullet.x >= this.width ||
        bullet.collide === true
      ) {
        removeFromArray(this.bullets, bullet);
      }
    });
  }
  /**
   * Draw the level on the canvas. This is called every frame to ensure that everything is drawn in one frame.
   *
   * @param ctx - The canvas context to draw on.
   */
  draw(ctx) {
    this.currentLevel.grid.forEach((tile) => {
      tile.forEach((tile2) => {
        ctx.fillStyle = tile2.walkable ? "rgba(255,255,255,0.3)" : "red";
        tile2.draw(ctx);
      });
    });

    this.enemy.draw(ctx);
    this.pathfinding.drawPath(ctx);

    if (this.player2) {
      this.player2.draw(ctx);
    }
    this.player.draw(ctx);

    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
  }
}

const game = new Game(canvas.width, canvas.height);
const player1 = new Player(game, 300, 300);
const player2 = new Player(game, 300, 500);

game.init();
//game.twoPlayerInit(player1, player2);
//game loop function using delta time to calculate frame time
/**
 * Animates the game. This is called every frame to update the game and draw the game. A function is required to provide the time since the last frame in the animation.
 *
 * @param currentTime - The current time of the animation in ms
 */
function animate(currentTime) {
  const frameTimeDelta = currentTime - previouseTime;
  previouseTime = currentTime;
  let fps = gameSpeed * frameTimeDelta;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //placeholder color

  game.update(fps);
  game.draw(ctx);
  requestAnimationFrame(animate);
}
