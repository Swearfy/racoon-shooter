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

    this.gameState = "running";

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
    let type = this.gameObjects[this.getSpawnChance()];
    let x = Math.random() * 900;
    let y = Math.random() * 900;

    const disX = this.player.x - x;
    const disY = this.player.y - y;
    const distnace = Math.sqrt(disX * disX + disY * disY);

    if (this.isBlocked(x, y, type) || distnace < 150) {
      x = Math.random() * 900;
      y = Math.random() * 900;
    }

    this.enemies.push(new Enemy(type, this, x, y));
  }
  isBlocked(x, y, type) {
    const tileInRange = this.currentLevel.searchTilesInRange(
      x,
      x + type.width,
      y,
      y + type.height
    );

    for (let i = 0; i < tileInRange.length; i++) {
      const tile = tileInRange[i];
      if (!tile.walkable) {
        return true;
      }
    }
    return false;
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
    // this.startCountdown();
  }
  init2Players() {
    this.player = new Player(this.gameObjects.player, this, 300, 300);
    this.player2 = new Player(this.gameObjects.player, this, 600, 300);
  }
  update() {
    this.currentLevel.update(this.gameLevels[this.level]);
    this.player.update(this.currentLevel, this.input.player1Keys);

    if (this.player2) {
      this.player2.update(this.currentLevel, this.input.player1Keys);
    }

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
          removeFromArray(this.enemies, enemy);
          removeFromArray(this.bullets, bullet);
          this.score += enemy.points;
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
    if (this.player2) {
      this.player2.draw(ctx);
    }
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });

    this.currentLevel.drawOverlay(ctx);
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }
}
