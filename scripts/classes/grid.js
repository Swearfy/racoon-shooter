import { Tile } from "./tile.js";
import { getTileAtIndex, toIndexRange } from "../utils/utils.js";
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
        this.grid[row][column] = new Tile(
          column,
          row,
          this.tileSize,
          !tileMask
        );
      }
    }
  }
  searchTilesInRange(x1, x2, y1, y2) {
    return toIndexRange(y1, y2, this.tileSize)
      .flatMap((y) =>
        toIndexRange(x1, x2, this.tileSize).map((x) =>
          getTileAtIndex(this.grid, x, y)
        )
      )
      .filter((tile) => tile !== undefined);
  }
}
