import { checkCollision } from "../utils/collision.js";
import { Entity } from "./entity.js";

export class Bullet extends Entity {
  constructor(game, x, y, velX, velY, dmg) {
    super(game, x, y, 10, 10, 0, 0);
    this.velX = velX;
    this.velY = velY;
    this.dmg = dmg;
    this.collide = false;
    this.color = "black";
  }
  update(level) {
    this.setVelocity(this.velX, this.velY);
    checkCollision(this, level);
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
