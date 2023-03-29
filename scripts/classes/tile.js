export class Tiles {
  constructor(x, y, tileSize, walkArea) {
    this.x = x;
    this.x2 = x + tileSize;
    this.y = y;
    this.y2 = y + tileSize;
    this.tileSize = tileSize;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.walkArea = walkArea;
  }
}
