import { checkTileCollision } from "../utils/checkTileCollision.js";
import { toIndex } from "../utils/utils.js";
import { GameObject } from "./gameObject.js";
import { Pathfinding } from "./pathfinding.js";
import { Sprite } from "./sprite.js";
export class Enemy extends GameObject {
  constructor(type, game, x, y) {
    super(type, game, x, y, 0, 0);
    this.type = type;

    this.findPath = type.pathFinding;
    // animation stuff
    this.sprite = new Sprite(this, 30);

    this.pathfinding = new Pathfinding();
    this.pathToFollow = [];
  }
  findPlayer() {
    this.pathToFollow = this.pathfinding.findPath(
      this.game.currentLevel.grid,
      this,
      this.game.player
    );
  }
  moveToTarget() {
    let target;
    if (this.findPath) {
      this.findPlayer();
      // We want to skip the first point in the path, because that's the current position.
      const currentPoint = this.pathToFollow.shift();
      target = this.pathToFollow[0];
    } else {
      target = this.game.player;
    }

    // Calculate the direction vector.
    if (target) {
      const dx = target.left - this.left;
      const dy = target.top - this.top;
      const angle = Math.atan2(dy, dx);

      // Move in the direction vector.
      let velX = Math.cos(angle) * this.maxSpeed;
      let velY = Math.sin(angle) * this.maxSpeed;

      // if (velX > 0) {
      //   velX = Math.ceil(velX);
      // } else if (velX < 0) {
      //   velX = Math.floor(velX);
      // }

      // if (velY > 0) {
      //   velY = Math.ceil(velY);
      // } else if (velY < 0) {
      //   velY = Math.floor(velY);
      // }

      this.setVelocity(velX, velY);
    }
  }
  update(level) {
    this.moveToTarget();
    checkTileCollision(this, level);
    this.move();
    this.sprite.setAnimation();
  }
  draw(ctx) {
    this.pathfinding.drawPath(ctx);
    this.sprite.draw(ctx);

    // ctx.fillStyle = "blue";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
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
