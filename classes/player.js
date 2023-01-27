import { Input } from "./input.js";

const player = new Image();
player.src = "/img/ratonstepleftscalefix.png";

export class Player {
  constructor(game) {
    this.game = game;
    this.x = (game.width - 80) / 2;
    this.y = (game.height + 80) / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 0;
    this.width = 160;
    this.height = 160;
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
  }
  draw(ctx) {
    ctx.drawImage(player, this.x, this.y);
  }
}
