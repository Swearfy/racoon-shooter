import { Bullet } from "./bullet.js";
export class BulletController {
  bullets = [];
  timerTilnext = 0;

  constructor(game) {
    this.game = game;
  }
  shoot(position, velocity, dmg, delay) {
    if (this.timerTilnext <= 0) {
      this.bullets.push(new Bullet(position, velocity, dmg));
      this.timerTilnext = delay;
    }
  }
  draw(ctx) {
    if (this.timerTilnext > 0) {
      this.timerTilnext--;
    }
    this.bullets.forEach((bullet) => {
      if (
        bullet.position.y <= -bullet.height ||
        bullet.position.y >= this.game.height ||
        bullet.position.x <= -bullet.width ||
        bullet.position.x >= this.game.width
      ) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }
}
