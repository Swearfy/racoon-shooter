export class Entity {
  constructor(x, y, width, height, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }
  get top() {
    return this.x + this.width;
  }
  get right() {
    return this.top + this.height;
  }
  get bottom() {
    return this.left + this.width;
  }
  get left() {
    return this.y + this.height;
  }
}
