export class Bullet {
  constructor(position, velocity, dmg) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.dmg = dmg;

    this.width = 10;
    this.height = 10;
    this.color = "black";
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.update();
  }
}
