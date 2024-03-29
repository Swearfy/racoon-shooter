export class GameObject {
  constructor(type, game, x, y, velocityX, velocityY) {
    this.type = type;
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = type.width;
    this.height = type.height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.maxSpeed = type.maxSpeed;
    this.offsetX = type.offsetX;
    this.offsetY = type.offsetY;

    this.spriteWidth = type.spriteWidth;
    this.spriteHeight = type.spriteHeight;

    this.lives = type.lives;
    this.image = new Image();
    this.image.src = type.image;
    this.state = "idle";
  }
  setState(state) {
    this.state = state;
  }
  getState() {
    return this.state;
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
    this.velocityX = speedX * this.game.dt;
    this.velocityY = speedY * this.game.dt;
  }
  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}
