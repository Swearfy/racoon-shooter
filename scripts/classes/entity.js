export class Entity {
  constructor(game, x, y, width, height, velocityX, velocityY) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }
  get top() {
    return this.y;
  }
  get right() {
    return this.x + this.width;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  setVelocity(speedX, speedY) {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityX = speedX * this.game.fps;
    this.velocityY = speedY * this.game.fps;
  }
}
