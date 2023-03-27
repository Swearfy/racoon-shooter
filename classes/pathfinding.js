export class Pathfind {
  constructor(tileMap) {
    this.openSet = [];
    this.closeSet = [];
    this.path = [];
    this.level = tileMap;
    this.start;
    this.end = this.level[30 - 1][30 - 1];
  }
  gridInit() {
    for (let row = 0; row < this.level.length; row++) {
      for (let col = 0; col < this.level[row].length; col++) {
        if (this.level[row][col] === 1) {
          this.level[row][col] = new GridPoint(row, col, 1);
        } else {
          this.level[row][col] = new GridPoint(row, col, 0);
        }
      }
    }

    for (let row = 0; row < this.level.length; row++) {
      for (let col = 0; col < this.level[row].length; col++) {
        this.level[row][col].updateNeighbors(this.level);
      }
    }
    console.log(this.level);
    this.start = this.level[0][0];
    this.end = this.level[this.level.length - 1][this.level.length - 1];
    this.openSet.push(this.start);
  }
  calculateHeuristic(pos1, pos2) {
    let d1 = Math.abs(pos2.x - pos1.x);
    let d2 = Math.abs(pos2.y - pos1.y);

    return d1 + d2;
  }
  searchTiles() {
    if (this.openSet.length > 0) {
      //code

      let lowestindex = 0;

      for (let i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[lowestindex].f) {
          lowestindex = i;
        }
      }

      let current = this.openSet[lowestindex];

      if (current === this.end) {
        console.log("reached!");
      }

      removeFromArray(this.openSet, current);
      this.closeSet.push(current);

      let neighbors = current.neighbors();

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
      }
    } else {
      //end
    }
  }
  removeFromArray(array, element) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] == element) {
        array.splice(i, 1);
      }
    }
  }
  draw(ctx) {
    for (let row = 0; row < this.level.length; row++) {
      for (let col = 0; col < this.level[row].length; col++) {
        this.level[row][col].draw(ctx, "blue");
      }
    }

    for (let i = 0; i < this.closeSet.length; i++) {
      this.closeSet[i].draw(ctx, "green");
    }

    for (let i = 0; i < this.openSet.length; i++) {
      this.openSet[i].draw(ctx, "black");
    }
  }
}

class GridPoint {
  constructor(x, y, isWalkable) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.parent = undefined;
    this.isWalkable = isWalkable;
  }
  updateNeighbors(grid) {
    let i = this.x;
    let j = this.y;

    if (i < 30 - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < 30 - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }
  draw(ctx, color) {
    ctx.strokeStyle = color;
    ctx.strokeRect(this.x * 30, this.y * 30, 30, 30);
  }
}
