import { checkTileCollision } from "../utils/checkTileCollision.js";
import { GameObject } from "./gameObject.js";

export class Bullet extends GameObject {
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
    checkTileCollision(this, level);
    this.move();
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
