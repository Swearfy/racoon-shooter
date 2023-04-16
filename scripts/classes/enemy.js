import { checkCollision } from "../utils/collision.js";
import { toIndex } from "../utils/utils.js";
import { Entity } from "./entity.js";
import { Pathfinding } from "./pathfinding.js";
import { Sprite } from "./sprite.js";
export class Enemy extends Entity {
  constructor(game, ee, level, player) {
    super(game, 500, 800, 30, 30, 0, 0);
    this.spriteWidth = 30;
    this.spriteHeight = 30;
    this.maxSpeed = 1;
    this.pathfinding = new Pathfinding();
    this.ee = ee;
    this.level = level;
    this.player = player;
    this.image = document.getElementById("test");
    this.sprite = new Sprite(this, 30);
    this.spriteWidth = 60;
    this.spriteHeight = 90;
    this.offsetX = 15;
    this.offsetY = 15;
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
  goTo() {
    this.pathToFollow = this.pathfinding.findPath(
      this.level,
      this,
      this.player
    );

    // We want to skip the first point in the path, because that's the current position.
    const currentPoint = this.pathToFollow.shift();
    const nextPoint = this.pathToFollow[0];

    // Calculate the direction vector.
    if (nextPoint) {
      const dx = nextPoint.left - this.left;
      const dy = nextPoint.top - this.top;
      const angle = Math.atan2(dy, dx);

      // Move in the direction vector.
      let velX = Math.cos(angle) * this.maxSpeed;
      let velY = Math.sin(angle) * this.maxSpeed;

      if (velX > 0) {
        velX = Math.ceil(velX);
      } else if (velX < 0) {
        velX = Math.floor(velX);
      }

      if (velY > 0) {
        velY = Math.ceil(velY);
      } else if (velY < 0) {
        velY = Math.floor(velY);
      }

      // console.log(`Angle: ${angle}, velX: ${velX}, velY: ${velY}`);
      this.setVelocity(velX, velY);
    }
  }
  update(level) {
    this.goTo();
    checkCollision(this, level);
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
