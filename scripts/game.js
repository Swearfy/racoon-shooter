import { Input } from "./utils/input.js";
import { Player } from "./classes/player.js";
import { Enemy } from "./classes/enemy.js";
import { Grid } from "./classes/grid.js";
import { EventEmitter } from "./utils/eventEmitter.js";
import { Bullet } from "./classes/bullet.js";
import { removeFromArray } from "./utils/utils.js";
import { checkObjectCollision } from "./utils/checkEntityCollision.js";
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
    this.bullets = [];
    this.enemies = [];
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
  shootBullet(gameObject, velX, velY) {
    this.bullets.push(
      new Bullet(
        this.gameAssets.gameObject.bullet,
        this,
        gameObject.left + gameObject.width / 2,
        gameObject.top + gameObject.height / 2.3,
        velX,
        velY,
        1
      )
    );
  }
  spawnEnemys() {
    this.gameAssets.levels[this.level].enemyTypes.forEach((enemyType) => {
      this.enemies.push(
        new Enemy(
          this.gameAssets.gameObject[enemyType],
          this,
          Math.random() * 900,
          Math.random() * 900,
          false
        )
      );
    });
  }
  init() {
    this.player = new Player(this.gameAssets.gameObject.player, this, 300, 300);
    this.input.inputControl(this.input.player1Keys);
    this.startCountdown();
  }
  update() {
    this.currentLevel.update(this.gameAssets.levels[this.level]);
    // this.spawnEnemys();
    this.player.update(this.currentLevel, this.input.player1Keys);

    this.enemies.forEach((enemy) => {
      enemy.update(this.currentLevel);
      this.bullets.forEach((bullet) => {
        if (checkObjectCollision(bullet, enemy)) {
          removeFromArray(this.enemies, enemy);
        }
      });
    });

    this.bullets.forEach((bullet) => {
      bullet.update(this.currentLevel);
      if (bullet.collide === true) {
        // Removes the bullet from the bullet list.
        removeFromArray(this.bullets, bullet);
      }
    });

    this.input.controllerInput(this.input.player1Keys);
  }
  draw(ctx) {
    this.currentLevel.draw(ctx);
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
    this.player.draw(ctx);
  }
}
