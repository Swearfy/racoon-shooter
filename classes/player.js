export class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }
  update(frameTimeDelta) {
    this.x += this.speedX * frameTimeDelta;
    this.y += this.speedY * frameTimeDelta;
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
