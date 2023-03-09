import { Bullet } from "./bullet.js";
export class Player {
  constructor(game, x, y) {
    this.game = game;
    this.player = document.getElementById("racon");
    this.width = 120;
    this.height = 170;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.bullets = [];

    this.collide = false;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  update(fps, input) {
    this.x += this.velocityX * fps;
    this.y += this.velocityY * fps;
    this.collisionX();
    this.collisionY();
    this.move(input);
    this.shot(input);

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
  }
  move(input) {
    let up = input[Object.keys(input)[0]];
    let down = input[Object.keys(input)[1]];
    let left = input[Object.keys(input)[2]];
    let right = input[Object.keys(input)[3]];
    let x;
    let y;

    left ? (x = -2) : right ? (x = 2) : (x = 0),
      up ? (y = -2) : down ? (y = 2) : (y = 0);

    this.velocityX = x;
    this.velocityY = y;
  }
  shot(input) {
    let shootup = input[Object.keys(input)[4]];
    let shootdown = input[Object.keys(input)[5]];
    let shootleft = input[Object.keys(input)[6]];
    let shootright = input[Object.keys(input)[7]];

    let velX = shootleft ? -2 : shootright ? 2 : 0;
    let velY = shootup ? -2 : shootdown ? 2 : 0;

    if (velX != 0 || velY != 0) {
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
  collisionX() {
    for (let i = 0; i < this.game.Level.blocks.length; i++) {
      let block = this.game.Level.blocks[i];
      if (this.game.checkCollision(this, block)) {
        if (this.velocityX > 0) {
          this.velocityX = 0;
          this.x = block.x - this.width - 0.01;
          break;
        }
        if (this.velocityX < 0) {
          this.velocityX = 0;
          this.x = block.x + block.width + 0.01;
          break;
        }
      }
    }
  }
  collisionY() {
    for (let i = 0; i < this.game.Level.blocks.length; i++) {
      let block = this.game.Level.blocks[i];
      if (this.game.checkCollision(this, block)) {
        if (this.velocityY > 0) {
          this.velocityY = 0;
          this.y = block.y - this.height - 0.01;
          break;
        }
        if (this.velocityY < 0) {
          this.velocityY = 0;
          this.y = block.y + block.height + 0.01;
          break;
        }
      }
    }
  }

  draw(ctx) {
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx);
    });
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
