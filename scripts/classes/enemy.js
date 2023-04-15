import { checkCollision } from "../utils/collision.js";
import { toIndex } from "../utils/utils.js";
import { Entity } from "./entity.js";
import { Pathfinding } from "./pathfinding.js";
export class Enemy extends Entity {
  constructor(game, ee, level, player) {
    super(game, Math.random() * 900, Math.random() * 900, 30, 30, 0, 0);
    this.spriteWidth = 30;
    this.spriteHeight = 30;
    this.maxSpeed = 1;
    this.pathfinding = new Pathfinding();
    this.ee = ee;
    this.level = level;
    this.player = player;
    this.ee.on("test", () => {
      // this.findPlayer();
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
    if (nextPoint) {
      const dx = nextPoint.x - currentPoint.x;
      const dy = nextPoint.y - currentPoint.y;
      const angle = Math.atan2(dy, dx);

      // Move in the direction vector.
      const velX = Math.round(Math.cos(angle)) * this.maxSpeed;
      const velY = Math.round(Math.sin(angle)) * this.maxSpeed;
      this.setVelocity(velX, velY);
      checkCollision(this, level);
      this.move();
    }
  }
  update(level) {
    this.goTo(level);
    this.findPlayer();
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
