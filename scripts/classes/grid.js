import { Tile } from "./tile.js";
import { getTileAtIndex, toIndexRange } from "../utils/utils.js";

export class Grid {
  constructor(game, level, tileSize) {
    this.game = game;
    this.level = level;
    this.grid = [];
    this.tileSize = tileSize;
    this.background = new Image();
    this.background.src = level.background;

    // this.overlay = new Image();
    // this.overlay.src = level.overlay;
  }
  makeGrid() {
    for (let row = 0; row < this.tileSize; row++) {
      this.grid[row] = [];
      for (let column = 0; column < this.tileSize; column++) {
        const tileMask = this.level.tileMap[row * this.tileSize + column];
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

  update() {
    this.makeGrid();
  }
  draw(ctx) {
    ctx.drawImage(this.background, 0, 0);

    this.grid.forEach((tile) => {
      tile.forEach((tile2) => {
        ctx.fillStyle = tile2.walkable ? "rgba(255,255,255,0.3)" : "red";
        tile2.draw(ctx);
      });
    });
  }
}
