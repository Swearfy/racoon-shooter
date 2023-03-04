import { BulletController } from "./classes/bulletController.js";
import { Input } from "./classes/input.js";
import { Level } from "./classes/level1.js";
import { Player } from "./classes/player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 900;
let timeBefore = null;
const gameSpeed = 0.2;

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.bulletController = new BulletController(this);

    this.player = new Player(this, 500, 600);
    this.input = new Input(this);
    this.Level = new Level(this);
  }
  update(fps) {
    this.Level.update();
    this.player.update(fps, this.currentLevel);
    this.movement();
    this.shot(fps);
    console.log(this.player.velocityX, this.player.velocityY);
  }

  draw(ctx) {
    this.Level.draw(ctx);
    this.player.draw(ctx);
    this.bulletController.draw(ctx);
  }
  checkCollision(obj1, obj2) {
    if (
      obj2.x > obj1.width + obj1.x ||
      obj1.x > obj2.width + obj2.x ||
      obj2.y > obj1.height + obj1.y ||
      obj1.y > obj2.height + obj2.y
    ) {
      return false;
    }
    return true;
  }
  movement() {
    //PLAYER 1
    // corner movement balance to not be faster then x or y axies
    // if (
    //   (this.input.p1Keys.w || this.input.p1Keys.s) &&
    //   (this.input.p1Keys.a || this.input.p1Keys.d)
    // ) {
    //   this.player.maxSpeed = this.player.maxSpeed * 0.71;
    // }

    if (this.input.p1Keys.w == true) {
      this.player.moveY(-2);
    } else if (this.input.p1Keys.s == true) {
      this.player.moveY(2);
    } else {
      this.player.moveY(0);
    }

    if (this.input.p1Keys.a == true) {
      this.player.moveX(-2);
    } else if (this.input.p1Keys.d == true) {
      this.player.moveX(2);
    } else {
      this.player.moveX(0);
    }
  }
  shot(fps) {
    const delay = 50 * fps;
    const dmg = 1;
    const maxSpeed = 5 * fps;
    const maxSpeedAngle = maxSpeed * 0.71;

    //PLAYER 1

    let x = this.player.x + this.player.width / 2;
    let y = this.player.y + this.player.height / 2.3;

    if (this.input.p1Keys.t && this.input.p1Keys.f) {
      this.bulletController.shoot(
        x,
        y,
        -maxSpeedAngle,
        -maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.t && this.input.p1Keys.h) {
      this.bulletController.shoot(
        x,
        y,
        maxSpeedAngle,
        -maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.g && this.input.p1Keys.f) {
      this.bulletController.shoot(
        x,
        y,
        -maxSpeedAngle,
        maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.g && this.input.p1Keys.h) {
      this.bulletController.shoot(
        x,
        y,
        maxSpeedAngle,
        maxSpeedAngle,
        dmg,
        delay
      );
    }

    if (this.input.p1Keys.t) {
      this.bulletController.shoot(x, y, 0, -maxSpeed, dmg, delay);
    }

    if (this.input.p1Keys.g) {
      this.bulletController.shoot(x, y, 0, maxSpeed, dmg, delay);
    }

    if (this.input.p1Keys.f) {
      this.bulletController.shoot(x, y, -maxSpeed, 0, dmg, delay);
    }

    if (this.input.p1Keys.h) {
      this.bulletController.shoot(x, y, maxSpeed, 0, dmg, delay);
    }
  }
}

const game = new Game(canvas.width, canvas.height);

//game loop function using delta time to calculate frame time
function animate(timeNow) {
  if (timeBefore === timeNow) {
    timeBefore = timeNow;
    requestAnimationFrame(animate);
    return;
  }

  const deltaTime = timeNow - timeBefore;
  timeBefore = timeNow;

  let fps = gameSpeed * (deltaTime / 1000);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //placeholder color
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  game.update(fps);
  game.draw(ctx);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
