import { getTileAtIndex } from "../utils/utils.js";

export class Tile {
  constructor(x, y, tileSize, walkable) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.walkable = !!walkable;
  }
  get top() {
    return this.y * this.tileSize;
  }
  get right() {
    return this.left + this.tileSize;
  }
  get bottom() {
    return this.top + this.tileSize;
  }
  get left() {
    return this.x * this.tileSize;
  }
  clone() {
    return new Tile(this.x, this.y, this.tileSize, this.walkable);
  }
  getNeighbors(matrix) {
    const neighbors = [];
    // ←
    if (getTileAtIndex(matrix, this.x - 1, this.y).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x - 1, this.y));
    }

    // ↑
    if (getTileAtIndex(matrix, this.x, this.y - 1).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x, this.y - 1));
    }

    // →
    if (getTileAtIndex(matrix, this.x + 1, this.y).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x + 1, this.y));
    }

    // ↓
    if (getTileAtIndex(matrix, this.x, this.y + 1).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x, this.y + 1));
    }

    // ↖
    if (getTileAtIndex(matrix, this.x - 1, this.y - 1).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x - 1, this.y - 1));
    }

    // ↗
    if (getTileAtIndex(matrix, this.x + 1, this.y - 1).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x + 1, this.y - 1));
    }

    // ↘
    if (getTileAtIndex(matrix, this.x + 1, this.y + 1).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x + 1, this.y + 1));
    }

    // ↙
    if (getTileAtIndex(matrix, this.x - 1, this.y + 1).walkable) {
      neighbors.push(getTileAtIndex(matrix, this.x - 1, this.y + 1));
    }

    return neighbors;
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
    // ctx.strokeRect(
    //   this.x * this.tileSize,
    //   this.y * this.tileSize,
    //   this.tileSize,
    //   this.tileSize
    // );
    // ctx.fillStyle = "white";
    // ctx.font = "10px Arial";
    // ctx.fillText(
    //   `(${this.x},${this.y})`,
    //   this.x * this.tileSize,
    //   (this.y + 1) * this.tileSize - 2
    // );
  }
}
