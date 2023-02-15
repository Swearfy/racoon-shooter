export class Bullet {
  constructor(x, y, speedX, speedY, dmg) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.dmg = dmg;

    this.width = 10;
    this.height = 10;
    this.color = "black";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update();
  }
}
