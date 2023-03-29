import { Tiles } from "../classes/tile.js";
import { toIndexRange, toIndex } from "./utils.js";
export class Grid {
  constructor() {
    this.grid = [];
  }
  makeGrid(tileMap, tileSize) {
    for (let row = 0; row < tileSize; row++) {
      this.grid[row] = [];
      for (let column = 0; column < tileSize; column++) {
        if (tileMap[row * tileSize + column] === 1) {
          this.grid[row][column] = new Tiles(column, row, tileSize, 1);
        } else {
          this.grid[row][column] = new Tiles(column, row, tileSize, 0);
        }
      }
    }
  }
  setIndex(x, y) {}
  getTileAtIndex(x, y) {
    const row = this.grid[y];
    if (row) {
      return row[x];
    }
    return undefined;
  }
  //   searchTilesInRange(x1, x2, y1, y2) {
  //     const tilesInRange = [];

  //     toIndexRange(y1, y2).forEach((y) => {
  //       toIndexRange(x1, x2).forEach((x) => {
  //         tilesInRange.push(this.getTileAtIndex(x, y));
  //       });
  //     });

  //     return tilesInRange;
  //   }
}

export function searchTilesInRange(x1, x2, y1, y2, tiles) {
  const tilesInRange = [];

  toIndexRange(y1, y2).forEach((y) => {
    toIndexRange(x1, x2).forEach((x) => {
      tilesInRange.push(tiles[x][y]);
    });
  });

  return tilesInRange;
}
