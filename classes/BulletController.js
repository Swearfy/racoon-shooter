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
    }
  }
  draw(ctx) {
    if (this.timerTilnext > 0) {
      this.timerTilnext--;
    }
    this.bullets.forEach((bullet) => {
      if (this.isDelete(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }
  isDelete(bullet) {
    return bullet.y <= -bullet.height;
  }
}
