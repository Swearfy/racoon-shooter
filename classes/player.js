export class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, 30, 30);
  }
  moveX(x) {
    this.speedX = x;
  }
  moveY(y) {
    this.speedY = y;
  }
}
