import { Input } from "./input.js";
export class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 0;
    this.input = new Input(this.game);
  }
  update(gameSpeed, frameTimeDelta) {
    this.maxSpeed = 2;
    this.x += this.speedX * gameSpeed * frameTimeDelta;
    this.y += this.speedY * gameSpeed * frameTimeDelta;

    if (
      (this.input.p1Keys.w.pressed || this.input.p1Keys.s.pressed) &&
      (this.input.p1Keys.a.pressed || this.input.p1Keys.d.pressed)
    ) {
      this.maxSpeed = this.maxSpeed * 0.71;
    }

    if (this.input.p1Keys.w.pressed) {
      this.speedY = -this.maxSpeed;
    } else if (this.input.p1Keys.s.pressed) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    if (this.input.p1Keys.a.pressed) {
      this.speedX = -this.maxSpeed;
    } else if (this.input.p1Keys.d.pressed) {
      this.speedX = this.maxSpeed;
    } else {
      this.speedX = 0;
    }
    console.log(this.maxSpeed);
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, 30, 30);
  }
}
