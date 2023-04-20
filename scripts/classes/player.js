import { Bullet } from "./bullet.js";
import { checkTileCollision } from "../utils/checkTileCollision.js";
import { GameObject } from "./gameObject.js";
import { removeFromArray, toIndex } from "../utils/utils.js";
import { Sprite } from "./sprite.js";

export class Player extends GameObject {
  constructor(type, game, x, y) {
    super(type, game, x, y, 0, 0);

    this.actionLock = 0;
    this.shootSpeed = 3;
    this.bulletSpeed = 4;

    // stuff for animation
    this.sprite = new Sprite(this, 20);
  }
  update(level, input) {
    this.handleInput(input);
    checkTileCollision(this, level);
    this.move();

    this.sprite.setAnimation();
    this.shoot(input);

    // if (this.velocityX !== 0 || this.velocityY !== 0) {
    //   this.ee.emit("test");
    // }
  }
  handleInput(keys) {
    // if (
    //   (keys.up.pressed || keys.down.pressed) &&
    //   (keys.left.pressed || keys.right.pressed)
    // ) {
    //   this.maxSpeed = this.maxSpeed * 0.71;
    // }

    let velx = keys.left.pressed
      ? -this.maxSpeed
      : keys.right.pressed
      ? this.maxSpeed
      : 0;
    let velY = keys.up.pressed
      ? -this.maxSpeed
      : keys.down.pressed
      ? this.maxSpeed
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

    // handle shooting animations
    if (keys.shootLeft.pressed && this.state === "moveRight") {
      this.setState("moveLeft");
    } else if (keys.shootLeft.pressed && this.state !== "moveLeft") {
      this.setState("shootLeft");
    } else if (keys.shootRight.pressed && this.state === "moveLeft") {
      this.setState("moveRight");
    } else if (keys.shootRight.pressed && this.state !== "moveRight") {
      this.setState("shootRight");
    }

    if (keys.shootUp.pressed && this.state === "moveDown") {
      this.setState("moveUp");
    } else if (keys.shootUp.pressed && this.state !== "moveUp") {
      this.setState("shootUp");
    } else if (keys.shootDown.pressed && this.state === "moveUp") {
      this.setState("moveDown");
    } else if (keys.shootDown.pressed && this.state !== "moveDown") {
      this.setState("shootDown");
    }

    if ((velX != 0 || velY != 0) && Date.now() > this.actionLock) {
      this.actionLock = Date.now() + 1000 / this.shootSpeed;
      this.game.shootBullet(this, velX, velY);
    }
  }
  draw(ctx) {
    this.sprite.draw(ctx);
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    // ctx.font = "12px Arial";
    // ctx.fillStyle = "black";
    // ctx.fillText(
    //   `(${Math.round(toIndex(this.x))}, ${Math.round(toIndex(this.y))})`,
    //   this.x + this.width / 2,
    //   this.y + this.height / 2
    // );
  }
}
