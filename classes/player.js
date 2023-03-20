export class Player {
  constructor(game, x, y) {
    this.game = game;
    this.player = document.getElementById("racon");
    this.width = 60;
    this.height = 60;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
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
    this.y += this.velocityY * fps;

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

  draw(ctx) {
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
