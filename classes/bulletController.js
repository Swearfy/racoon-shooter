import { Bullet } from "./bullet.js";
export class BulletController {
  bullets = [];
  timerTilnext = 0;

  constructor(game) {
    this.game = game;
  }
  shoot(x, y, velocityX, velocityY, dmg, delay) {
    if (this.timerTilnext <= 0) {
      this.bullets.push(new Bullet(x, y, velocityX, velocityY, dmg));
      this.timerTilnext = delay;
    }
  }
  draw(ctx) {
    if (this.timerTilnext > 0) {
      this.timerTilnext--;
    }
    this.bullets.forEach((bullet) => {
      if (
        bullet.y <= -bullet.height ||
        bullet.y >= this.game.height ||
        bullet.x <= -bullet.width ||
        bullet.x >= this.game.width
      ) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
        return;
      }
      bullet.draw(ctx);
    });
  }
}
