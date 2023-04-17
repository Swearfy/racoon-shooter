export class Entity {
  constructor(
    game,
    x,
    y,
    width,
    height,
    spriteWidth,
    spriteHeight,
    velocityX,
    velocityY,
    maxSpeed,
    lives,
    image
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.maxSpeed = maxSpeed;
    this.offsetX = 15;
    this.offsetY = 15;

    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;

    this.lives = lives;
    this.image = document.getElementById(image);

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
    this.velocityX = speedX * this.game.fps;
    this.velocityY = speedY * this.game.fps;
  }
  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}
