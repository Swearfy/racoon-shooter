export class Bullet {
  constructor(x, y, velocityX, velocityY, dmg) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.dmg = dmg;

    this.width = 10;
    this.height = 10;
    this.color = "black";
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update();
  }
}
