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
    this.gameLevels = assets.gameLevels;
    this.gameObjects = assets.gameObject;
    this.fps = 0;
    this.level = 1;
    this.currentLevel = new Grid(this, this.gameLevels[this.level], 30);
    this.input = new Input();
    this.gameState = "starting";
    this.bullets = [];
    this.enemies = [];

    this.score = 0;

    this.maxEnemy = 40;

    this.enemyTimer = 0;
    this.spawnInterval = 300;
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
        this.gameObjects.bullet,
        this,
        gameObject.left + gameObject.width / 2,
        gameObject.top + gameObject.height / 2.3,
        velX,
        velY,
        1
      )
    );
  }
  clearEnemyArray() {}
  spawnEnemys() {
    this.enemies.push(
      new Enemy(
        this.gameObjects[this.getSpawnChance()],
        this,
        Math.random() * 900,
        Math.random() * 900
      )
    );
  }
  getSpawnChance() {
    const randomNumber = Math.random() * 100;
    let probability = 0;

    for (let i = 0; i < this.gameLevels[this.level].enemyTypes.length; i++) {
      probability += this.gameLevels[this.level].enemyTypes[i].spawnChance;
      if (randomNumber <= probability) {
        return Object.keys(this.gameObjects)[i];
      }
    }
  }
  updateScore() {
    document.getElementById("score").innerText = this.score;
  }
  init() {
    this.player = new Player(this.gameObjects.player, this, 300, 300);
    this.input.inputControl(this.input.player1Keys);
    this.startCountdown();
  }
  update() {
    this.currentLevel.update(this.gameLevels[this.level]);
    this.player.update(this.currentLevel, this.input.player1Keys);

    if (this.enemyTimer > this.spawnInterval) {
      this.spawnEnemys();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += this.fps;
    }

    this.enemies.forEach((enemy) => {
      enemy.update(this.currentLevel);
      this.bullets.forEach((bullet) => {
        if (checkObjectCollision(bullet, enemy)) {
          this.score += enemy.points;
          removeFromArray(this.enemies, enemy);
          removeFromArray(this.bullets, bullet);
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
    this.updateScore();
  }
  draw(ctx) {
    this.currentLevel.draw(ctx);

    this.player.draw(ctx);
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });

    this.currentLevel.drawOverlay(ctx);
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }
}
