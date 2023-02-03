import { Input } from "./input.js";
const player = new Image();
player.src = "/img/ratonstepleftscalefix.png";

export class Player {
  constructor(game, x, y) {
    this.game = game;
    this.spriteWidth = 120;
    this.spriteHeight = 170;
    this.width = 120;
    this.height = 170;
    this.x = x - this.width * 0.7;
    this.y = y - this.height * 0.7;
    this.hitboxX = this.x + 20;
    this.hitboxY = this.y + 40;
    this.hitboxWidth = 70;
    this.hitboxHeight = 100;
    this.speedX = 0;
    this.speedY = 0;
    this.radius = 30;

    this.maxSpeed = 0;
    this.input = new Input(this.game);
  }
  update(gameSpeed, frameTimeDelta) {
    this.maxSpeed = 2;
    this.x += this.speedX * gameSpeed * frameTimeDelta;
    this.y += this.speedY * gameSpeed * frameTimeDelta;
    this.hitboxX = this.x + 20;
    this.hitboxY = this.y + 40;

    // corner movment balance to not be faster then x or y axies
    if (
      (this.input.p1Keys.w.pressed || this.input.p1Keys.s.pressed) &&
      (this.input.p1Keys.a.pressed || this.input.p1Keys.d.pressed)
    ) {
      this.maxSpeed = this.maxSpeed * 0.71;
    }

    this.speedY = 0;
    if (this.input.p1Keys.w.pressed) {
      this.speedY = -this.maxSpeed;
      // this.game.currentLevel = 1;
    } else if (this.input.p1Keys.s.pressed) {
      this.speedY = this.maxSpeed;
      // this.game.currentLevel = 2;
    }

    this.speedX = 0;
    if (this.input.p1Keys.a.pressed) {
      this.speedX = -this.maxSpeed;
    } else if (this.input.p1Keys.d.pressed) {
      this.speedX = this.maxSpeed;
    }

    //out of bounds check on x axies
    if (this.hitboxX < 0) this.x = -20;
    if (this.hitboxX > this.game.width - this.hitboxWidth)
      this.x = this.game.width - this.hitboxWidth - 20;

    //out of bounds check on y axies
    if (this.hitboxY < 0) this.y = 0 - 40;
    if (this.hitboxY > this.game.height - this.hitboxHeight)
      this.y = this.game.height - this.hitboxHeight - 40;
  }
  draw(ctx) {
    ctx.drawImage(player, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx.fillRect(
      this.hitboxX,
      this.hitboxY,
      this.hitboxWidth,
      this.hitboxHeight
    );
    ctx.fill();
  }
}
