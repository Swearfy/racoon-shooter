import { Input } from "./utils/input.js";
import { Player } from "./classes/player.js";
import { Enemy } from "./classes/enemy.js";
import { Grid } from "./classes/grid.js";
import { EventEmitter } from "./utils/eventEmitter.js";
export class Game {
  constructor(assets, width, height) {
    this.width = width;
    this.height = height;
    this.gameAssets = assets;
    this.fps = 0;
    this.level = 1;
    this.currentLevel = new Grid(this, this.gameAssets.levels[this.level], 30);
    this.input = new Input();
    this.gameState = "starting";
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
        this.level++; // change level
      } else {
        initialWidth -= stepDiameter;
        countdownDisplay.style.width = initialWidth + "px";
      }
    }, 1000);
  }
  spawnEnemys() {}
  init() {
    this.enemy = new Enemy(
      this.gameAssets.gameObject.opossum,
      this,
      300,
      300,
      false
    );
    this.player = new Player(this.gameAssets.gameObject.player, this, 300, 300);
    this.input.inputControl(this.input.player1Keys);
    this.startCountdown();
  }
  update() {
    this.currentLevel.update(this.gameAssets.levels[this.level]);
    this.player.update(this.currentLevel, this.input.player1Keys);
    this.enemy.update(this.currentLevel);
    this.input.controllerInput(this.input.player1Keys);
  }
  draw(ctx) {
    this.currentLevel.draw(ctx);
    this.enemy.draw(ctx);
    this.player.draw(ctx);
  }
}
