export class Player {
  constructor(game, x, y, bulletController) {
    this.game = game;
    this.player = document.getElementById("racon");
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
    this.maxSpeed = 0;
    this.bulletController = bulletController;
  }
  update(fps) {
    this.maxSpeed = 2;
    this.x += this.speedX * fps;
    this.y += this.speedY * fps;
    this.hitboxX = this.x + 20;
    this.hitboxY = this.y + 40;
    this.speedX = 0;
    this.speedY = 0;

    //out of bounds check on x axies
    if (this.hitboxX < 0) this.x = -20;
    if (this.hitboxX > this.game.width - this.hitboxWidth)
      this.x = this.game.width - this.hitboxWidth - 20;

    //out of bounds check on y axies
    if (this.hitboxY < 0) this.y = 0 - 40;
    if (this.hitboxY > this.game.height - this.hitboxHeight)
      this.y = this.game.height - this.hitboxHeight - 40;
  }
  moveUp() {
    this.speedY = -this.maxSpeed;
  }
  moveDown() {
    this.speedY = this.maxSpeed;
  }
  moveLeft() {
    this.speedX = -this.maxSpeed;
  }
  moveRight() {
    this.speedX = this.maxSpeed;
  }

  draw(ctx) {
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height);
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
