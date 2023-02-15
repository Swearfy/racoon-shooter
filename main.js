import { BulletController } from "./classes/bulletController.js";
import { Input } from "./classes/input.js";
import { Map } from "./classes/maps.js";
import { Player } from "./classes/player.js";

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
    this.currentLevel = 1;
    this.bulletController = new BulletController(this);
    this.bulletController2 = new BulletController(this);

    this.player = new Player(this, 500, 600, this.bulletController);
    this.player2 = new Player(this, 200, 600, this.bulletController2);
    this.map = new Map(this);
    this.input = new Input(this);
  }
  update(fps) {
    this.map.update(this.currentLevel);
    this.player.update(fps, this.currentLevel);
    this.player2.update(fps, this.currentLevel);
    this.shot(fps);
    this.movement();
  }
  draw(ctx) {
    this.map.draw(ctx, this.currentLevel);
    this.player.draw(ctx);
    this.player2.draw(ctx);
    this.bulletController.draw(ctx);
    this.bulletController2.draw(ctx);
  }
  movement() {
    //PLAYER 1
    // corner movement balance to not be faster then x or y axies
    if (
      (this.input.p1Keys.w || this.input.p1Keys.s) &&
      (this.input.p1Keys.a || this.input.p1Keys.d)
    ) {
      this.player.maxSpeed = this.player.maxSpeed * 0.71;
    }

    if (this.input.p1Keys.w == true) {
      this.player.moveUp();
    }
    if (this.input.p1Keys.s == true) {
      this.player.moveDown();
    }
    if (this.input.p1Keys.a == true) {
      this.player.moveLeft();
    }
    if (this.input.p1Keys.d == true) {
      this.player.moveRight();
    }

    // PLAYER 2
    // corner movement balance to not be faster then x or y axies

    if (
      (this.input.p2Keys.i || this.input.p2Keys.k) &&
      (this.input.p2Keys.j || this.input.p2Keys.l)
    ) {
      this.player2.maxSpeed = this.player2.maxSpeed * 0.71;
    }

    if (this.input.p2Keys.i == true) {
      this.player2.moveUp();
    }
    if (this.input.p2Keys.k == true) {
      this.player2.moveDown();
    }
    if (this.input.p2Keys.j == true) {
      this.player2.moveLeft();
    }
    if (this.input.p2Keys.l == true) {
      this.player2.moveRight();
    }
  }
  shot(fps) {
    const delay = 50 * fps;
    const dmg = 1;
    const maxSpeed = 5 * fps;
    const maxSpeedAngle = maxSpeed * 0.71;

    //PLAYER 1
    const bulletX = this.player.x + this.player.width / 2;
    const bulletY = this.player.y + this.player.height / 2.3;

    if (this.input.p1Keys.t && this.input.p1Keys.f) {
      this.bulletController.shoot(
        bulletX,
        bulletY,
        -maxSpeedAngle,
        -maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.t && this.input.p1Keys.h) {
      this.bulletController.shoot(
        bulletX,
        bulletY,
        maxSpeedAngle,
        -maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.g && this.input.p1Keys.f) {
      this.bulletController.shoot(
        bulletX,
        bulletY,
        -maxSpeedAngle,
        maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.g && this.input.p1Keys.h) {
      this.bulletController.shoot(
        bulletX,
        bulletY,
        maxSpeedAngle,
        maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.t) {
      this.bulletController.shoot(bulletX, bulletY, 0, -maxSpeed, dmg, delay);
    }

    if (this.input.p1Keys.g) {
      this.bulletController.shoot(bulletX, bulletY, 0, maxSpeed, dmg, delay);
    }

    if (this.input.p1Keys.f) {
      this.bulletController.shoot(bulletX, bulletY, -maxSpeed, 0, dmg, delay);
    }

    if (this.input.p1Keys.h) {
      this.bulletController.shoot(bulletX, bulletY, maxSpeed, 0, dmg, delay);
    }

    // PLAYER 2
    const bulletX2 = this.player2.x + this.player2.width / 2;
    const bulletY2 = this.player2.y + this.player2.height / 2.3;

    if (this.input.p2Keys.ArrowUp && this.input.p2Keys.ArrowLeft) {
      this.bulletController2.shoot(
        bulletX2,
        bulletY2,
        -maxSpeedAngle,
        -maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p2Keys.ArrowUp && this.input.p2Keys.ArrowRight) {
      this.bulletController2.shoot(
        bulletX2,
        bulletY2,
        maxSpeedAngle,
        -maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p2Keys.ArrowDown && this.input.p2Keys.ArrowLeft) {
      this.bulletController2.shoot(
        bulletX2,
        bulletY2,
        -maxSpeedAngle,
        maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p2Keys.ArrowDown && this.input.p2Keys.ArrowRight) {
      this.bulletController2.shoot(
        bulletX2,
        bulletY2,
        maxSpeedAngle,
        maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p2Keys.ArrowUp) {
      this.bulletController2.shoot(
        bulletX2,
        bulletY2,
        0,
        -maxSpeed,
        dmg,
        delay
      );
    }

    if (this.input.p2Keys.ArrowDown) {
      this.bulletController2.shoot(bulletX2, bulletY2, 0, maxSpeed, dmg, delay);
    }

    if (this.input.p2Keys.ArrowLeft) {
      this.bulletController2.shoot(
        bulletX2,
        bulletY2,
        -maxSpeed,
        0,
        dmg,
        delay
      );
    }

    if (this.input.p2Keys.ArrowRight) {
      this.bulletController2.shoot(bulletX2, bulletY2, maxSpeed, 0, dmg, delay);
    }
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
  game.draw(ctx);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
