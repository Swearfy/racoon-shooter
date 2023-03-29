import { Entity } from "./entity.js";

export class Bullet extends Entity {
  constructor(x, y, velocityX, velocityY, dmg) {
    super(x, y, 10, 10, velocityX, velocityY);
    this.dmg = dmg;
    this.collide = false;
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
