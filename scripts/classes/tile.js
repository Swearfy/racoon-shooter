import { getTileAtIndex } from "../utils/utils.js";

export class Tile {
  constructor(x, y, tileSize, walkable) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neigbours = [];
    this.walkable = !!walkable;
    this.parent = null;
    this.closed = false;
  }
  getNeighbors(grid) {
    // ←
    if (getTileAtIndex(grid, this.x - 1, this.y).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x - 1, this.y));
    }

    // ↑
    if (getTileAtIndex(grid, this.x, this.y - 1).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x, this.y - 1));
    }

    // →
    if (getTileAtIndex(grid, this.x + 1, this.y).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x + 1, this.y));
    }

    // ↓
    if (getTileAtIndex(grid, this.x, this.y + 1).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x, this.y + 1));
    }

    // ↖
    if (getTileAtIndex(grid, this.x - 1, this.y - 1).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x - 1, this.y - 1));
    }

    // ↗
    if (getTileAtIndex(grid, this.x + 1, this.y - 1).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x + 1, this.y - 1));
    }

    // ↘
    if (getTileAtIndex(grid, this.x + 1, this.y + 1).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x + 1, this.y + 1));
    }

    // ↙
    if (getTileAtIndex(grid, this.x - 1, this.y + 1).walkable) {
      this.neigbours.push(getTileAtIndex(grid, this.x - 1, this.y + 1));
    }

    return this.neigbours;
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
