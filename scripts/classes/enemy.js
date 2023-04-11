import { checkX, checkY } from "../utils/collision.js";
import { Entity } from "./entity.js";
import { Pathfinding } from "./pathfinding.js";
export class Enemy extends Entity {
  constructor(game, ee, level, player) {
    super(Math.random() * 900, Math.random() * 900, 30, 30, 0, 0);
    this.game = game;
    this.spriteWidth = 30;
    this.spriteHeight = 30;
    this.maxSpeed = 0.4;
    this.pathfinding = new Pathfinding();
    this.ee = ee;
    this.level = level;
    this.player = player;
    this.ee.on("test", () => {
      "this.findPlayer();";
    });
    this.pathToFollow = [];
  }
  findPlayer() {
    this.pathToFollow = this.pathfinding.findPath(
      this.level,
      this,
      this.player
    );
  }
  // Move to the next point in the path.
  goTo(level) {
    const currentPoint = this.pathToFollow.shift();
    const nextPoint = this.pathToFollow[0];

    // Calculate the direction vector.
    if (nextPoint && nextPoint.walkable) {
      const dx = nextPoint.x - currentPoint.x;
      const dy = nextPoint.y - currentPoint.y;
      const angle = Math.atan2(dy, dx);

      // Move in the direction vector.
      this.x += Math.cos(angle) * this.maxSpeed;
      checkX(this, level);
      this.y += Math.sin(angle) * this.maxSpeed;
      checkY(this, level);

      // Check if we have reached the next point.
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        this.goTo(level);
      }
    }
  }
  update(fps, level) {
    this.goTo(level);
    this.findPlayer();
  }
  draw(ctx) {
    this.pathfinding.drawPath(ctx);
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
