import { Input } from "./scripts/utils/input.js";
import { Player } from "./scripts/classes/player.js";
import { Enemy } from "./scripts/classes/enemy.js";
import { Grid } from "./scripts/classes/grid.js";
import { level_1 } from "./assets/tilemaps/level-1.js";
import { level_2 } from "./assets/tilemaps/level-2.js";
import { EventEmitter } from "./scripts/utils/eventEmitter.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lives = document.getElementById("lives");
const powerUps = document.getElementById("powerUps");

canvas.width = 900;
canvas.height = 900;
let previouseTime = null;
const gameSpeed = 0.2;

async function promise() {
  const response = await fetch("./assets/gameObjectTypes.json");
  const enemyType = await response.json();

  return enemyType;
}

class Game {
  constructor(assets, width, height) {
    this.width = width;
    this.height = height;
    this.fps = 0;
    this.enemyData = assets;
    this.currentLevel = new Grid(30);

    this.input = new Input();
  }
  startCountdown() {
    const countdownDisplay = document.getElementById("timer");
    let seconds = 10;
    let initialWidth = countdownDisplay.offsetWidth; // get initial width of countdownDisplay element
    const stepDiameter = initialWidth / seconds;

    const interval = setInterval(() => {
      seconds--;
      if (seconds === 0) {
        clearInterval(interval);
        countdownDisplay.style.width = 0 + "px";

        console.log("Countdown ended!");
      } else {
        initialWidth -= stepDiameter;
        countdownDisplay.style.width = initialWidth + "px";
      }
    }, 1000);
  }

  spawnEnemys() {}
  init() {
    this.enemy = new Enemy(this.enemyData.opossum, this, 300, 300, false);
    this.player = new Player(this.enemyData.player, this, 300, 300);
    this.currentLevel.makeGrid(level_2.tileMap);
    this.input.inputControl(this.input.player1Keys);
    this.startCountdown();
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
