import { getTileAtIndex } from "../utils/utils.js";

export class Tile {
  constructor(x, y, tileSize, walkable) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.walkable = !!walkable;
  }
  get centerX() {
    return this.x * (this.tileSize / 2);
  }
  get centerY() {
    return this.y * (this.tileSize / 2);
  }
  clone() {
    return new Tile(this.x, this.y, this.tileSize, this.walkable);
  }
  getNeighbors(grid) {
    const neigbours = [];
    // ←
    if (getTileAtIndex(grid, this.x - 1, this.y).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x - 1, this.y));
    }

    // ↑
    if (getTileAtIndex(grid, this.x, this.y - 1).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x, this.y - 1));
    }

    // →
    if (getTileAtIndex(grid, this.x + 1, this.y).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x + 1, this.y));
    }

    // ↓
    if (getTileAtIndex(grid, this.x, this.y + 1).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x, this.y + 1));
    }

    // ↖
    if (getTileAtIndex(grid, this.x - 1, this.y - 1).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x - 1, this.y - 1));
    }

    // ↗
    if (getTileAtIndex(grid, this.x + 1, this.y - 1).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x + 1, this.y - 1));
    }

    // ↘
    if (getTileAtIndex(grid, this.x + 1, this.y + 1).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x + 1, this.y + 1));
    }

    // ↙
    if (getTileAtIndex(grid, this.x - 1, this.y + 1).walkable) {
      neigbours.push(getTileAtIndex(grid, this.x - 1, this.y + 1));
    }

    return neigbours;
  }
  equals(tile) {
    return this.x === tile.x && this.y === tile.y;
  }
  draw(ctx) {
    ctx.fillRect(
      this.x * this.tileSize,
      this.y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }
}
