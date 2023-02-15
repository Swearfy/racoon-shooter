import { Bullet } from "./bullet.js";
export class BulletController {
  bullets = [];
  timerTilnext = 0;

  constructor(game) {
    this.game = game;
  }
  shoot(x, y, speedX, speedY, dmg, delay) {
    if (this.timerTilnext <= 0) {
      this.bullets.push(new Bullet(x, y, speedX, speedY, dmg));
      this.timerTilnext = delay;
      console.log(this.bullets);
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
      }
      bullet.draw(ctx);
    });
  }
}
