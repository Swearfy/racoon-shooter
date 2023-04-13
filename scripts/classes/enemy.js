import { checkX, checkY } from "../utils/collision.js";
import { toIndex } from "../utils/utils.js";
import { Entity } from "./entity.js";
import { Pathfinding } from "./pathfinding.js";
export class Enemy extends Entity {
  constructor(game, ee, level, player) {
    super(Math.random() * 900, Math.random() * 900, 30, 30, 0, 0);
    this.game = game;
    this.spriteWidth = 30;
    this.spriteHeight = 30;
    this.maxSpeed = 1;
    this.pathfinding = new Pathfinding();
    this.ee = ee;
    this.level = level;
    this.player = player;
    this.ee.on("test", () => {
      this.findPlayer();
    });
    this.pathToFollow = [];
  }
  findPlayer() {
    this.pathToFollow = this.pathfinding.findPath(
      this.level,
      this,
      this.player
    );
    console.log(this.pathToFollow);
  }
  // Move to the next point in the path.
  goTo(level, fps) {
    const currentPoint = this.pathToFollow.shift();
    const nextPoint = this.pathToFollow[0];

    // Calculate the direction vector.
    if (nextPoint) {
      const dx = nextPoint.x - currentPoint.x;
      const dy = nextPoint.y - currentPoint.y;
      const angle = Math.atan2(dy, dx);

      // Move in the direction vector.
      this.x += this.velocityX * fps;
      this.velocityX = Math.round(Math.cos(angle)) * this.maxSpeed;
      checkX(this, level);

      this.y += this.velocityY * fps;
      this.velocityY = Math.round(Math.sin(angle)) * this.maxSpeed;
      checkY(this, level);
    }
  }
  update(fps, level) {
    this.goTo(level, fps);
    // this.findPlayer();
  }
  draw(ctx) {
    this.pathfinding.drawPath(ctx);

    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // Draw position on self
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      `(${Math.round(toIndex(this.x))}, ${Math.round(toIndex(this.y))})`,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }
}
