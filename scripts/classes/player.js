import { checkTileCollision } from "../utils/checkTileCollision.js";
import { Input } from "./input.js";
import { GameObject } from "./gameObject.js";
import { Sprite } from "./sprite.js";

export class Player extends GameObject {
  constructor(type, game, x, y, playerIndex) {
    super(type, game, x, y, 0, 0);

    this.actionLock = 0;
    this.rateOfFire = 3;
    this.bulletSpeed = 400;
    this.input = new Input(playerIndex);
    this.keys = this.input.playerControls[playerIndex];
    this.dmg = 1;

    // stuff for animation
    this.sprite = new Sprite(this, 20);
  }

  update(level) {
    this.input.controllerInput();
    this.handleInput(this.keys);
    checkTileCollision(this, level);
    this.move();

    this.sprite.setAnimation();
    this.handleShootAnim(this.keys);
    this.shoot(this.keys);
  }

  handleInput(keys) {
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

    // normalize diagonal velocity
    if (velx !== 0 && velY !== 0) {
      velx /= Math.sqrt(2);
      velY /= Math.sqrt(2);
    }

    this.setVelocity(velx, velY);
  }

  shoot(keys) {
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

    if (velX !== 0 && velY !== 0) {
      velX /= Math.sqrt(2);
      velY /= Math.sqrt(2);
    }

    if ((velX !== 0 || velY !== 0) && Date.now() > this.actionLock) {
      this.actionLock = Date.now() + 1000 / this.rateOfFire;
      this.game.shootBullet(this, velX, velY, this.dmg);
    }
  }
  handleShootAnim(keys) {
    // handle shooting animations
    if (keys.shootLeft.pressed && this.state === "moveRight") {
      this.setState("moveLeft");
    }
    if (keys.shootLeft.pressed && this.state !== "moveLeft") {
      this.setState("shootLeft");
    }
    if (keys.shootRight.pressed && this.state === "moveLeft") {
      this.setState("moveRight");
    }
    if (keys.shootRight.pressed && this.state !== "moveRight") {
      this.setState("shootRight");
    }
    if (keys.shootUp.pressed && this.state === "moveDown") {
      this.setState("moveUp");
    }
    if (keys.shootUp.pressed && this.state !== "moveUp") {
      this.setState("shootUp");
    }
    if (keys.shootDown.pressed && this.state === "moveUp") {
      this.setState("moveDown");
    }
    if (keys.shootDown.pressed && this.state !== "moveDown") {
      this.setState("shootDown");
    }
  }
  draw(ctx) {
    this.sprite.draw(ctx);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    // ctx.font = "12px Arial";
    // ctx.fillStyle = "black";
    // ctx.fillText(
    //   `(${Math.round(toIndex(this.x))}, ${Math.round(toIndex(this.y))})`,
    //   this.x + this.width / 2,
    //   this.y + this.height / 2
    // );
  }
}
