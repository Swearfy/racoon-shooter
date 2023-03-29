export class Grid {
  constructor() {
    this.tileSize = 30;
    this.grid = [];
  }
  makeGrid(tileMap) {}
  setIndex(x, y) {}
  getAtIndex(x, y) {
    const row = this.grid[y];
    if (row) {
      return row[x];
    }
    return undefined;
  }
  getTileAtIndex(x, y) {
    const tile = this.getAtIndex(x, y);

    const x1 = x * this.tileSize;
    const x2 = x1 + this.tileSize;
    const y1 = y * this.tileSize;
    const y2 = y1 + this.tileSize;
    return {
      tile,
      x1,
      x2,
      y1,
      y2,
    };
  }
  searchTilesInRange(x1, x2, y1, y2) {
    const tilesInRange = [];

    toIndexRange(y1, y2).forEach((y) => {
      toIndexRange(x1, x2).forEach((x) => {
        tilesInRange.push(this.getTileAtIndex(x, y));
      });
    });

    return tilesInRange;
  }
}
