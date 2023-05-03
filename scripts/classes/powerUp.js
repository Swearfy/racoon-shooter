import { GameObject } from "./gameObject.js";

export class PowerUp extends GameObject {
  constructor(type, game, x, y) {
    super(type, game, x, y, 0, 0);
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.duration = 1;
  }
  applyEffect(player) {
    switch (this.type.powerUp) {
      case "life":
        player.lives += this.type.lives;
        break;
      case "damageBoost":
        player.dmg + 1;
        break;

      case "speed":
        player.maxSpeed += 200;
        break;

      case "fireRate":
        player.rateOfFire + 1;
        break;
    }
  }
  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
