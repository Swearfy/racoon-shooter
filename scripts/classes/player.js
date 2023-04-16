import { Bullet } from "./bullet.js";
import { checkCollision } from "../utils/collision.js";
import { Entity } from "./entity.js";
import { removeFromArray, toIndex } from "../utils/utils.js";
import { Sprite } from "./sprite.js";

export class Player extends Entity {
  constructor(game, x, y, ee) {
    super(game, x, y, 30, 70, 0, 0);
    this.image = document.getElementById("racon");
    this.ee = ee;

    this.playerSpeed = 2;

    this.actionLock = 0;
    this.shootSpeed = 3;
    this.bulletSpeed = 4;
    this.bullets = [];

    // stuff for animation
    this.sprite = new Sprite(this, 20);
    this.spriteWidth = 60;
    this.spriteHeight = 90;
    this.offsetX = 15;
    this.offsetY = 15;
  }
  update(level, input) {
    this.handleInput(input);
    checkCollision(this, level);
    this.move();

    this.shoot(input);
    this.sprite.setAnimation();

    for (const bullet of this.bullets) {
      bullet.update(level);

      // Removes the bullet from the bullet list.
      if (bullet.collide === true) {
        removeFromArray(this.bullets, bullet);
      }
    }
    // if (this.velocityX !== 0 || this.velocityY !== 0) {
    //   this.ee.emit("test");
    // }
  }
  handleInput(keys) {
    // if (
    //   (keys.up.pressed || keys.down.pressed) &&
    //   (keys.left.pressed || keys.right.pressed)
    // ) {
    //   this.playerSpeed = this.playerSpeed * 0.71;
    // }

    let velx = keys.left.pressed
      ? -this.playerSpeed
      : keys.right.pressed
      ? this.playerSpeed
      : 0;
    let velY = keys.up.pressed
      ? -this.playerSpeed
      : keys.down.pressed
      ? this.playerSpeed
      : 0;

    this.setVelocity(velx, velY);
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

    if (keys.shootLeft.pressed) {
      this.setState("moveLeft");
    }

    if ((velX != 0 || velY != 0) && Date.now() > this.actionLock) {
      this.actionLock = Date.now() + 1000 / this.shootSpeed;
      this.bullets.push(
        new Bullet(
          this.game,
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
    this.sprite.draw(ctx);
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `(${Math.round(toIndex(this.x))}, ${Math.round(toIndex(this.y))})`,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }
}
