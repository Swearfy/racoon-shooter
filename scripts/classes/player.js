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
  }
  update(fps, level) {
    this.x += this.velocityX * fps;
    checkX(this, level);

    this.y += this.velocityY * fps;
    checkY(this, level);

    //out of bounds check on x axies
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    //out of bounds check on y axies
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
    }
  }
  move(x, y) {
    this.velocityX = x;
    this.velocityY = y;
  }
  shoot(velX, velY) {
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
