export class Tile {
  constructor(x, y, tileSize, walkable) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.walkable = !!walkable;
  }
  draw(ctx) {
    if (this.walkable) {
      ctx.fillStyle = "red";
    }
    if (!this.walkable) {
      ctx.fillStyle = "rgba(255,255,255,0.2)";
    }
    ctx.fillRect(
      this.x * this.tileSize,
      this.y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }
}
