import { checkCollision } from "../utils/collision.js";
import { Entity } from "./entity.js";

export class Bullet extends Entity {
  constructor(type, game, x, y, velX, velY, dmg) {
    super(type, game, x, y, velX, velY);
    this.velX = velX;
    this.velY = velY;
    this.dmg = dmg;
    this.collide = false;
    this.color = "black";
  }
  update(level) {
    this.setVelocity(this.velX, this.velY);
    checkCollision(this, level);
    this.move();
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
