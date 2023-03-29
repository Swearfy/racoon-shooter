export class Enemy {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.x = 0;
    this.y = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.spriteWidth = 30;
    this.spriteHeight = 30;
    this.dx = 0;
    this.dy = 0;
  }
  update(fps, player) {
    this.x += this.velocityX * fps;
    this.y += this.velocityY * fps;

    let dist = Math.atan2(player.y - this.y, player.x - this.x);
    let dx = Math.cos(dist);
    let dy = Math.sin(dist);

    this.velocityX = dx;
    this.velocityY = dy;
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
