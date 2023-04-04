import { checkX, checkY } from "../utils/collision.js";
import { Entity } from "./entity.js";
import { Pathfinding } from "./pathfinding.js";
export class Enemy extends Entity {
  constructor(game) {
    super(0, 0, 20, 20, 0, 0);
    this.game = game;
    this.spriteWidth = 30;
    this.spriteHeight = 30;
    this.dx = 0;
    this.dy = 0;
    this.pathfinding = new Pathfinding();
  }
  update(fps, player, level) {
    this.x += this.velocityX * fps;
    checkX(this, level);

    this.y += this.velocityY * fps;
    checkY(this, level);

    if (this.pathfinding.start !== this || player !== this.pathfinding.end) {
      this.pathfinding.findPath(level, this, player);
    }
  }
  draw(ctx) {
    this.pathfinding.drawPath(ctx);

    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
