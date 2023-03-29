import { Tile } from "./tile.js";
import { toIndexRange } from "../utils/utils.js";
export class Grid {
  constructor(tileSize) {
    this.grid = [];
    this.tileSize = tileSize;
  }
  makeGrid(tileMap) {
    for (let row = 0; row < this.tileSize; row++) {
      this.grid[row] = [];
      for (let column = 0; column < this.tileSize; column++) {
        const tileMask = tileMap[row * this.tileSize + column];
        this.grid[row][column] = new Tile(column, row, this.tileSize, tileMask);
      }
    }
  }
  setIndex(x, y) {}
  getTileAtIndex(x, y) {
    return this.grid[y]?.[x];
  }
  searchTilesInRange(x1, x2, y1, y2) {
    const tilesInRange = [];

    toIndexRange(y1, y2, this.tileSize).forEach((y) => {
      toIndexRange(x1, x2, this.tileSize).forEach((x) => {
        const tile = this.getTileAtIndex(x, y);
        if (tile) {
          tilesInRange.push(tile);
        }
      });
    });

    return tilesInRange;
  }
}
