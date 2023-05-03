import { Player } from "./classes/player.js";
import { Enemy } from "./classes/enemy.js";
import { Matrix } from "./classes/matrix.js";
import { Bullet } from "./classes/bullet.js";
import { isBlocked, removeFromArray } from "./utils/utils.js";
import { checkObjectCollision } from "./utils/checkEntityCollision.js";
import { Door } from "./classes/door.js";
import { PowerUp } from "./classes/powerUp.js";

const countdownDisplay = document.getElementById("timer");

export class Game {
  constructor(assets, width, height, numberOfPlayers) {
    this.width = width;
    this.height = height;
    this.gameLevels = assets.gameLevels;
    this.gameObjects = assets.gameObject;
    this.dt = 0;
    this.level = 1;

    this.bulletSound = new Audio("./assets/audio/bulletsound.mp3");
    this.enemyHit = new Audio("./assets/audio/Hitdamage.wav");

    this.playerHit = new Audio("./assets/audio/playerHit.wav");
    this.gameOverSound = new Audio("./assets/audio/gameover.mp3");
    this.powerUpSound = new Audio("./assets/audio/pickPowerSound.wav");

    this.bulletSound.volume = 0.2;
    this.enemyHit.volume = 0.2;
    this.playerHit.volume = 0.2;
    this.gameOverSound.volume = 0.2;
    this.powerUpSound.volume = 0.1;

    this.currentLevel = new Matrix(this, this.gameLevels[this.level], 30);

    const { x: playerX, y: playerY } = this.gameLevels[this.level].player1Pos;

    this.player = new Player(
      this.gameObjects.player,
      this,
      playerX,
      playerY,
      1
    );

    if (numberOfPlayers === 2) {
      const { x: playerX2, y: playerY2 } =
        this.gameLevels[this.level].player2Pos;

      this.player2 = new Player(
        this.gameObjects.player,
        this,
        playerX2,
        playerY2,
        2
      );
    } else {
      this.player2 = null;
    }

    this.bullets = [];
    this.enemies = [];
    this.powerUps = [];

    this.gameState = "running";

    this.score = 0;

    this.enemyTimer = 0;
    this.spawnInterval = 1;
    countdownDisplay.style.width = this.width + "px";
    this.startCountdown();

    // window.addEventListener("keydown", (e) => {
    //   if (e.key === "Escape") {
    //     let change = false;
    //     if (this.gameState === "change-level") {
    //       change = true;
    //     }

    //     if (change === true && this.gameState === "Paused") {
    //       this.gameState = "change-level";
    //     } else if (this.gameState === "Paused") {
    //       this.gameState = "running";
    //     } else {
    //       this.gameState = "Paused";
    //     }
    //   }
    // });
  }

  startCountdown() {
    let initialWidth = countdownDisplay.offsetWidth; // get initial width of countdownDisplay element
    let seconds = 5;
    const stepDiameter = initialWidth / seconds;

    const interval = setInterval(() => {
      seconds--;

      if (this.gameState === "lost" || this.gameState === "won") {
        clearInterval(interval);
        return;
      }

      if (this.gameState === "Paused") {
        clearInterval(interval);
      }

      if (seconds === 0) {
        clearInterval(interval);
        countdownDisplay.style.width = 0 + "px";
        this.gameState = "change-level";
      } else {
        initialWidth -= stepDiameter;
        countdownDisplay.style.width = initialWidth + "px";
      }
    }, 1000);
  }

  shootBullet(gameObject, velX, velY, dmg) {
    this.bulletSound.play();
    this.bullets.push(
      new Bullet(
        this.gameObjects.bullet,
        this,
        gameObject.left + gameObject.width / 2,
        gameObject.top + gameObject.height / 2.3,
        velX,
        velY,
        dmg
      )
    );
  }

  createEnemy() {
    const type = this.gameObjects[this.getSpawnChance()];
    const x = Math.random() * 900;
    const y = Math.random() * 900;

    const player1DistX = this.player.x - x;
    const player1DistY = this.player.y - y;
    const player1Distance = Math.sqrt(
      player1DistX * player1DistX + player1DistY * player1DistY
    );

    let closestPlayer = this.player;
    let closestDistance = player1Distance;

    if (this.player2) {
      const player2DistX = this.player2.x - x;
      const player2DistY = this.player2.y - y;
      const player2Distance = Math.sqrt(
        player2DistX * player2DistX + player2DistY * player2DistY
      );

      if (player2Distance < closestDistance) {
        closestPlayer = this.player2;
        closestDistance = player2Distance;
      }
    }

    if (
      isBlocked(x, y, type, this.currentLevel) ||
      Math.abs(closestDistance) < 200
    ) {
      this.createEnemy();
      return;
    }

    this.enemies.push(new Enemy(type, this, x, y, closestPlayer));
  }
  spawnEnemy() {
    if (Date.now() > this.enemyTimer) {
      this.enemyTimer = Date.now() + 1000 / this.spawnInterval;
      this.createEnemy();
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

  updateUI() {
    document.getElementById("score").innerText = this.score;
    document.getElementById("endScore").innerText = this.score;
    document.getElementById("lives").innerText = this.player.lives;
    if (this.player2) {
      document.getElementById("livesDisplay2").style.display = "block";
      document.getElementById("lives2").innerText = this.player2.lives;
    }
  }

  update() {
    if (this.gameState === "Paused" || this.gameState === "lost") {
      return;
    }

    if (this.gameState === "running") {
      this.currentLevel.update(this.gameLevels[this.level]);
      this.spawnEnemy();
    }

    // update ui
    if (this.gameState === "change-level" || this.gameState === "running") {
      this.updateUI();
    }

    //player update and stuff
    this.player.update(this.currentLevel);
    if (this.player2) {
      this.player2.update(this.currentLevel);
    }

    // changing  level
    if (this.gameState === "change-level" && this.enemies.length === 0) {
      if (!this.gameLevels[this.level + 1]) {
        this.gameState = "won";
        gameOverScreen(this.gameState);
        return;
      }

      const { x: doorX, y: doorY } = this.gameLevels[this.level].doorPos;

      // creating door
      this.door = new Door(this.gameObjects.door, this, doorX, doorY);

      // getting player positions of next level
      const { x: playerX, y: playerY } =
        this.gameLevels[this.level + 1].player1Pos;
      const { x: playerX2, y: playerY2 } =
        this.gameLevels[this.level + 1].player2Pos;

      // check collision with door
      if (checkObjectCollision(this.player, this.door)) {
        this.level++;
        this.gameState = "running";
        countdownDisplay.style.width = this.width + "px";
        this.powerUps = [];

        this.startCountdown();
        this.player.x = playerX;
        this.player.y = playerY;

        if (this.player2) {
          this.player2.x = playerX2;
          this.player2.y = playerY2;
        }
        this.door = null;
      }

      if (this.player2 && this.door) {
        if (checkObjectCollision(this.player2, this.door)) {
          this.level++;
          this.gameState = "running";
          countdownDisplay.style.width = this.width + "px";
          this.powerUps = [];

          this.startCountdown();
          this.player.x = playerX;
          this.player.y = playerY;
          this.player2.x = playerX2;
          this.player2.y = playerY2;
          this.door = null;
        }
      }
    }

    // enemy check collision and more
    this.enemies.forEach((enemy) => {
      enemy.update(this.currentLevel);
      if (checkObjectCollision(enemy, this.player)) {
        removeFromArray(this.enemies, enemy);
        this.playerHit.play();

        this.player.lives--;
        if (this.player.lives === 0) {
          this.gameState = "lost";
          this.gameOverSound.play();
          gameOverScreen(this.gameState);
        }
      }

      //player 2 lives
      if (this.player2 && checkObjectCollision(enemy, this.player2)) {
        removeFromArray(this.enemies, enemy);
        this.playerHit.play();

        this.player2.lives--;
        if (this.player2.lives === 0) {
          this.gameState = "lost";
          this.gameOverSound.play();

          gameOverScreen(this.gameState);
        }
      }

      this.bullets.forEach((bullet) => {
        if (checkObjectCollision(bullet, enemy)) {
          this.enemyHit.play();
          enemy.lives--;
          if (enemy.lives === 0) {
            removeFromArray(this.enemies, enemy);
            this.powerUps.push(
              new PowerUp(this.gameObjects.life, this, enemy.x, enemy.y)
            );
            this.score += enemy.points;
          }
          removeFromArray(this.bullets, bullet);
        }
      });
    });

    this.powerUps.forEach((powerUp) => {
      if (checkObjectCollision(powerUp, this.player)) {
        this.powerUpSound.play();

        powerUp.applyEffect(this.player);
        console.log(powerUp);
        removeFromArray(this.powerUps, powerUp);
      }

      if (this.player2 && checkObjectCollision(powerUp, this.player2)) {
        this.powerUpSound.play();
        powerUp.applyEffect(this.player2);
        removeFromArray(this.powerUps, powerUp);
      }
    });

    // bullet update
    this.bullets.forEach((bullet) => {
      bullet.update(this.currentLevel);
      if (bullet.collide === true) {
        // Removes the bullet from the bullet list if it hits wall
        removeFromArray(this.bullets, bullet);
      }
    });
  }

  draw(ctx) {
    // draw background of map
    this.currentLevel.draw(ctx);
    // draw overlay of map
    this.currentLevel.drawOverlay(ctx);

    // if the door exists draw it
    if (this.door) {
      this.door.draw(ctx);
    }

    // player 1 draw
    this.player.draw(ctx);
    // player 2 draw if exist
    if (this.player2) {
      this.player2.draw(ctx);
    }

    // draw bullets
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });

    // draw enemies
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });

    this.powerUps.forEach((power) => {
      power.draw(ctx);
    });
  }
}

function gameOverScreen(outcome) {
  document.getElementById("game").style.display = "none";
  document.getElementById("gameMenu").style.display = "flex";
  document.getElementById("GameOverScreen").style.display = "flex";
  document.getElementById("outcome").innerText = `You ${outcome}!`;
}
