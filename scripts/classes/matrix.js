import { Tile } from "./tile.js";
import { getTileAtIndex, toIndexRange } from "../utils/utils.js";

export class Matrix {
  constructor(game, level, tileSize) {
    this.game = game;
    this.level = level;
    this.matrix = [];
    this.tileSize = tileSize;
    this.background = new Image();
    this.overlay = new Image();
  }
  arrayToMatrix() {
    for (let row = 0; row < this.tileSize; row++) {
      this.matrix[row] = [];
      for (let column = 0; column < this.tileSize; column++) {
        const tileMask = this.level.tileMap[row * this.tileSize + column];
        this.matrix[row][column] = new Tile(
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
          getTileAtIndex(this.matrix, x, y)
        )
      )
      .filter((tile) => tile !== undefined);
  }

  update(level) {
    this.level = level;
    this.arrayToMatrix();
  }
  draw(ctx) {
    this.background.src = this.level.background;

    ctx.drawImage(this.background, 0, 0);

    // this.matrix.forEach((tile) => {
    //   tile.forEach((tile2) => {
    //     ctx.fillStyle = tile2.walkable ? "rgba(255,255,255,0.3)" : "red";
    //     tile2.draw(ctx);
    //   });
    // });
  }
  drawOverlay(ctx) {
    this.overlay.src = this.level.overlay;

    ctx.drawImage(this.overlay, 0, 0);
  }
}
