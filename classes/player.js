import { Input } from "./input.js";

const player = new Image();
player.src = "/img/ratonstepleftscalefix.png";

export class Player {
  constructor(game) {
    this.game = game;
    this.x = game.width / 2;
    this.y = game.height / 2;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 0;
    this.width = 120;
    this.height = 170;
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
      // this.speedY = -this.maxSpeed;
      this.game.currentLevel = 1;
    } else if (this.input.p1Keys.s.pressed) {
      // this.speedY = this.maxSpeed;
      this.game.currentLevel = 2;
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
    ctx.drawImage(player, this.x - 60, this.y - 80);
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.arc(this.x, this.y, 45, 0, Math.PI * 2, false);
    // ctx.fillRect(this.x - 40, this.y - 40, 70, 100);
    ctx.fi = 0;
    ctx.fill();
  }
}
