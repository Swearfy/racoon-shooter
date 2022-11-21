export class Player {
  constructor(game) {
    this.game = game;
    this.x = 50;
    // this.game.width / 2 - 15;
    this.y = 50;
  }
  update() {}
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, 30, 30);
  }
  moveX(dir) {
    this.x += dir;
  }
  moveY(dir) {
    this.y += dir;
  }
}
