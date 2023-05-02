import { Player } from "./classes/player.js";
import { Enemy } from "./classes/enemy.js";
import { Matrix } from "./classes/matrix.js";
import { Bullet } from "./classes/bullet.js";
import { isBlocked, removeFromArray } from "./utils/utils.js";
import { checkObjectCollision } from "./utils/checkEntityCollision.js";
import { Door } from "./classes/door.js";

const countdownDisplay = document.getElementById("timer");

export class Game {
  constructor(assets, width, height, numberOfPlayers) {
    this.width = width;
    this.height = height;
    this.gameLevels = assets.gameLevels;
    this.gameObjects = assets.gameObject;
    this.fps = 0;
    this.level = 1;

    this.currentLevel = new Matrix(this, this.gameLevels[this.level], 30);

    const playerX = this.gameLevels[this.level].playerPos.x;
    const playerY = this.gameLevels[this.level].playerPos.y;

    this.player = new Player(
      this.gameObjects.player,
      this,
      playerX,
      playerY,
      1
    );

    if (numberOfPlayers === 2) {
      this.player2 = new Player(this.gameObjects.player, this, 600, 300, 2);
    } else {
      this.player2 = null;
    }

    this.bullets = [];
    this.enemies = [];

    this.gameState = "running";

    this.score = 0;

    this.enemyTimer = 0;
    this.spawnInterval = 200;
    countdownDisplay.style.width = this.width + "px";
    this.startCountdown();

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.gameState === "Paused") {
          this.gameState = "running";
        } else {
          this.gameState = "Paused";
        }
      }
    });
  }

  startCountdown() {
    let initialWidth = countdownDisplay.offsetWidth; // get initial width of countdownDisplay element
    let seconds = 5;
    const stepDiameter = initialWidth / seconds;

    const interval = setInterval(() => {
      seconds--;

      if (this.gameState === "lost" || this.gameState === "finished") {
        clearInterval(interval);
        return;
      }

      if (this.gameState === "Paused") {
        clearInterval(interval);
      }

      if (seconds === 0) {
        clearInterval(interval);
        countdownDisplay.style.width = 0 + "px";
        this.gameState = "ending";

        if (this.gameState !== "Paused") {
          setTimeout(() => (this.gameState = "change-level"), 1000);
        }
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

  createEnemy() {
    const type = this.gameObjects[this.getSpawnChance()];
    const x = Math.random() * 900;
    const y = Math.random() * 900;

    const disX = this.player.x - x;
    const disY = this.player.y - y;
    const distance = Math.sqrt(disX * disX + disY * disY);

    if (isBlocked(x, y, type, this.currentLevel) || Math.abs(distance) < 200) {
      this.createEnemy();
      return;
    }

    this.enemies.push(new Enemy(type, this, x, y));
  }

  spawnEnemy() {
    // enemy spawn timer
    if (this.enemyTimer > this.spawnInterval) {
      this.createEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += this.fps;
    }
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
    document.getElementById("endScore").innerText = this.score;
    document.getElementById("lives").innerText = this.player.lives;
  }

  update() {
    if (this.gameState === "Paused" || this.gameState === "lost") {
      return;
    }

    if (this.gameState === "running") {
      this.currentLevel.update(this.gameLevels[this.level]);
      this.spawnEnemy();
    }

    //player update and stuff
    this.player.update(this.currentLevel);
    if (this.player2) {
      this.player2.update(this.currentLevel);
    }

    if (this.gameState === "change-level") {
      if (!this.gameLevels[this.level + 1]) {
        this.gameState = "finished";
        return;
      }

      const doorX = this.gameLevels[this.level].doorPos.x;
      const doorY = this.gameLevels[this.level].doorPos.y;
      const playerX = this.gameLevels[this.level].playerPos.x;
      const playerY = this.gameLevels[this.level].playerPos.y;

      this.door = new Door(this, doorX, doorY, 100, 100);

      if (checkObjectCollision(this.player, this.door)) {
        this.level++;
        this.gameState = "running";
        countdownDisplay.style.width = this.width + "px";

        this.startCountdown();
        this.player.x = playerX;
        this.player.y = playerY;
      }
    }

    // enemy check collision and more
    this.enemies.forEach((enemy) => {
      enemy.update(this.currentLevel);
      if (checkObjectCollision(enemy, this.player)) {
        removeFromArray(this.enemies, enemy);
        this.player.lives--;
        if (this.player.lives === 0) {
          this.gameState = "lost";
          document.getElementById("game").style.display = "none";
          document.getElementById("gameMenu").style.display = "flex";
          document.getElementById("GameOverScreen").style.display = "flex";
        }
      }
      this.bullets.forEach((bullet) => {
        if (checkObjectCollision(bullet, enemy)) {
          enemy.lives--;
          if (enemy.lives === 0) {
            removeFromArray(this.enemies, enemy);
            this.score += enemy.points;
          }
          removeFromArray(this.bullets, bullet);
        }
      });
    });

    // bullet update
    this.bullets.forEach((bullet) => {
      bullet.update(this.currentLevel);
      if (bullet.collide === true) {
        // Removes the bullet from the bullet list.
        removeFromArray(this.bullets, bullet);
      }
    });

    // update score
    this.updateScore();
    console.log(this.gameState);
  }

  draw(ctx) {
    this.currentLevel.draw(ctx);
    this.currentLevel.drawOverlay(ctx);

    if (this.door) {
      this.door.draw(ctx);
    }

    this.player.draw(ctx);
    if (this.player2) {
      this.player2.draw(ctx);
    }
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });

    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }
}
