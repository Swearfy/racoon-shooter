import { GameObject } from "./gameObject.js";

export class Door extends GameObject {
  constructor(type, game, x, y) {
    super(type, game, x, y, 0, 0);
    this.width = 100;
    this.height = 100;
  }
  changeLevel() {}
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
}
