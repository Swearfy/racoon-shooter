import { GameObject } from "./gameObject.js";

export class Door extends GameObject {
  constructor(type, game, x, y) {
    super(type, game, x, y, 0, 0);
    this.width = 100;
    this.height = 100;
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
