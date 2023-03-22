import { Bullet } from "./bullet.js";

export class Player {
  constructor(game, x, y, level) {
    this.game = game;
    this.player = document.getElementById("racon");
    this.width = 120;
    this.height = 170;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.level = level;
    this.bullets = [];
    this.actionLock = 0;
    this.shootSpeed = 3;
  }
  get left() {
    return this.y + this.height;
  }
  get top() {
    return this.x + this.width;
  }
  get right() {
    return this.top + this.height;
  }
  get bottom() {
    return this.left + this.width;
  }
  set velX(x) {
    this.velocityX = x;
  }
  set velY(y) {
    this.velocityY = y;
  }
  update(fps) {
    this.x += this.velocityX * fps;
    this.level.checkX(this);

    this.y += this.velocityY * fps;
    this.level.checkY(this);

    this.bullets.forEach((bullet) => {
      if (
        bullet.y <= -bullet.height ||
        bullet.y >= this.game.height ||
        bullet.x <= -bullet.width ||
        bullet.x >= this.game.width
      ) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
        return;
      }
    });

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
      this.bullets.push(
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
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height);
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
