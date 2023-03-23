export class Bullet {
  constructor(x, y, velocityX, velocityY, dmg) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.dmg = dmg;
    this.collide = false;

    this.width = 10;
    this.height = 10;
    this.color = "black";
  }
  update(fps) {
    this.x += this.velocityX * fps;
    this.y += this.velocityY * fps;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
