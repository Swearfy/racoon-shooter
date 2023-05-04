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
        if (player.lives < 3) {
          player.lives += this.type.lives;
        }
        break;
      case "dmgBoost":
        if (player.dmg < 2) {
          player.dmg += this.type.dmgBoost;
        } else {
          player.dmg += this.type.dmgBoost;
          setTimeout(() => {
            player.dmg -= this.type.dmgBoost;
          }, 2000);
        }
        break;
      case "speed":
        player.maxSpeed += this.type.maxSpeed;
        setTimeout(() => {
          player.maxSpeed -= this.type.maxSpeed;
        }, 2000);
        break;
      case "fireRate":
        player.rateOfFire += this.type.fireRate;
        setTimeout(() => {
          player.rateOfFire -= this.type.fireRate;
        }, 2000);
        break;
    }
  }
  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
