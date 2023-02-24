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

    this.collide = false;
  }
  update(fps) {
    this.x += this.velocityX * fps;
    this.y += this.velocityY * fps;
    this.collisionY();
    this.collisionX();

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
  moveX(x) {
    this.velocityX = x;
  }
  moveY(y) {
    this.velocityY = y;
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
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
