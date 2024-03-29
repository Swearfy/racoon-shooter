import { checkTileCollision } from "../utils/checkTileCollision.js";
import { getSpawnChance, toIndex } from "../utils/utils.js";
import { GameObject } from "./gameObject.js";
import { Pathfinding } from "./pathfinding.js";
import { PowerUp } from "./powerUp.js";
import { Sprite } from "./sprite.js";
export class Enemy extends GameObject {
  constructor(type, game, x, y, player) {
    super(type, game, x, y, 0, 0);
    this.type = type;

    this.findPath = type.pathFinding;
    this.collision = type.collision;
    this.points = type.points;
    // animation stuff
    this.sprite = new Sprite(this, 30);

    this.pathfinding = new Pathfinding();
    this.pathToFollow = [];
    this.player = player;

    this.powerUpChance = [
      { type: "life", spawnChance: 5 },
      { type: "speed", spawnChance: 10 },
      { type: "fireRate", spawnChance: 10 },
      { type: "dmgBoost", spawnChance: 10 },
      { type: "multiShoot", spawnChance: 0 },
    ];
  }
  findPlayer() {
    this.pathToFollow = this.pathfinding.findPath(
      this.game.currentLevel.matrix,
      this,
      this.player
    );
  }
  moveToTarget() {
    let target;
    if (this.findPath) {
      this.findPlayer();
      // We want to skip the first point in the path, because that's the current position.

      if (this.pathToFollow) {
        const currentPoint = this.pathToFollow.shift();
        target = this.pathToFollow[0];
      }
    } else {
      target = this.player;
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

  dropPowerUp() {
    const type = getSpawnChance(this.powerUpChance, this.game);
    console.log(type);
    if (type !== undefined) {
      this.game.powerUps.push(new PowerUp(type, this.game, this.x, this.y));
    }
  }

  update(level) {
    this.moveToTarget();
    if (this.collision) {
      checkTileCollision(this, level);
    }
    this.move();
    this.sprite.setAnimation();
  }
  draw(ctx) {
    // this.pathfinding.drawPath(ctx);
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
