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
  }
  update(fps, player, level) {
    this.x += this.velocityX * fps;
    checkX(this, level);

    this.y += this.velocityY * fps;
    checkY(this, level);
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
