import { Bullet } from "./bullet.js";
import { checkX, checkY } from "../utils/collision.js";
import { Entity } from "./entity.js";

export class Player extends Entity {
  constructor(game, x, y, level) {
    super(x, y, 30, 70, 0, 0);
    this.game = game;
    this.player = document.getElementById("racon");
    this.level = level;
    this.actionLock = 0;
    this.shootSpeed = 3;
    this.spriteWidth = 60;
    this.spriteHeight = 90;
    this.hitboxX = this.x + 35;
    this.hitboxY = this.y + 40;
    this.bulletSpeed = 4;
    this.playerSpeed = 2;
  }
  update(fps, level, input, ee) {
    this.x += this.velocityX * fps;
    checkX(this, level);

    this.y += this.velocityY * fps;
    checkY(this, level);

    this.move(input, ee);
    this.shoot(input);
  }
  move(keys, ee) {
    // if (
    //   (keys.up.pressed || keys.down.pressed) &&
    //   (keys.left.pressed || keys.right.pressed)
    // ) {
    //   this.playerSpeed = this.playerSpeed * 0.71;
    // }

    this.velocityX = keys.left.pressed
      ? -this.playerSpeed
      : keys.right.pressed
      ? this.playerSpeed
      : 0;
    this.velocityY = keys.up.pressed
      ? -this.playerSpeed
      : keys.down.pressed
      ? this.playerSpeed
      : 0;

    if (this.velocityX !== 0 || this.velocityY !== 0) {
      ee.emit("test");
    }
  }
  shoot(keys) {
    // if (
    //   (keys.shootUp.pressed || keys.shootDown.pressed) &&
    //   (keys.shootLeft.pressed || keys.shootRight.pressed)
    // ) {
    //   bulletSpeed = bulletSpeed * 0.71;
    // }

    let velX = keys.shootLeft.pressed
      ? -this.bulletSpeed
      : keys.shootRight.pressed
      ? this.bulletSpeed
      : 0;
    let velY = keys.shootUp.pressed
      ? -this.bulletSpeed
      : keys.shootDown.pressed
      ? this.bulletSpeed
      : 0;

    if ((velX != 0 || velY != 0) && Date.now() > this.actionLock) {
      this.actionLock = Date.now() + 1000 / this.shootSpeed;
      this.game.bullets.push(
        new Bullet(
          this.x + this.width / 2,
          this.y + this.height / 2.3,
          velX,
          velY,
          1
        )
      );
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.player,
      this.x - 15,
      this.y - 15,
      this.spriteWidth,
      this.spriteHeight
    );

    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
