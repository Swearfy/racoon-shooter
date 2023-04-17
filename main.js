import { Input } from "./scripts/utils/input.js";
import { Player } from "./scripts/classes/player.js";
import { Enemy } from "./scripts/classes/enemy.js";
import { Grid } from "./scripts/classes/grid.js";
import { level_1 } from "./assets/tilemaps/level-1.js";
import { level_2 } from "./assets/tilemaps/level-2.js";
import { EventEmitter } from "./scripts/utils/eventEmitter.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;
let previouseTime = null;
const gameSpeed = 0.2;

async function promise() {
  const response = await fetch("./assets/enemyTypes.json");
  const enemyType = await response.json();

  return enemyType;
}

class Game {
  constructor(assets, width, height) {
    this.width = width;
    this.height = height;
    this.fps = 0;
    this.enemyData = assets;
    this.ee = new EventEmitter();
    this.currentLevel = new Grid(30);

    this.input = new Input();
    this.enemy = new Enemy(this.enemyData.opossum, this, 300, 300);
    this.player = new Player(this, 300, 300);
  }
  setEnemyTypes(enemyTypes) {
    this.enemyData = enemyTypes;
  }
  init() {
    this.currentLevel.makeGrid(level_2);
    this.input.inputControl(this.input.player1Keys);
  }
  twoPlayerInit(player1, player2) {
    this.currentLevel.makeGrid(level_1);
    this.player = player1;
    this.player2 = player2;
    this.input.inputControl(this.input.player1Keys);

    requestAnimationFrame(animate);
  }
  update() {
    const image = document.getElementById("level1");
    ctx.drawImage(image, 0, 0);
    this.player.update(this.currentLevel, this.input.player1Keys);

    if (this.player2) {
      this.player2.update(this.currentLevel);
    }

    this.enemy.update(this.currentLevel);

    this.input.controllerInput(this.input.player1Keys);
  }
  draw(ctx) {
    this.currentLevel.grid.forEach((tile) => {
      tile.forEach((tile2) => {
        ctx.fillStyle = tile2.walkable ? "rgba(255,255,255,0.3)" : "red";
        tile2.draw(ctx);
      });
    });

    this.enemy.draw(ctx);

    if (this.player2) {
      this.player2.draw(ctx);
    }
    this.player.draw(ctx);
  }
}

// const game = new Game(canvas.width, canvas.height);

// game.init();

//game.twoPlayerInit(player1, player2);
//game loop function using delta time to calculate frame time
/**
 * Animates the game. This is called every frame to update the game and draw the game. A function is required to provide the time since the last frame in the animation.
 *
 * @param currentTime - The current time of the animation in ms
 */

promise().then((assets) => {
  const game = new Game(assets, canvas.width, canvas.height);
  game.init();

  requestAnimationFrame(animate);

  function animate(currentTime) {
    const frameTimeDelta = currentTime - previouseTime;
    previouseTime = currentTime;
    game.fps = gameSpeed * frameTimeDelta;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //placeholder color

    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
});
