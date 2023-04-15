import {
  calculateH,
  cloneGrid,
  removeFromArray,
  toIndex,
} from "../utils/utils.js";

export class Pathfinding {
  constructor() {
    this.openSet = [];
    this.start;
    this.end;
    this.clonedGrid = [];
    this.path = [];
    this.closedSet = [];
  }
  updateStartAndEnd(start, end) {
    let startY = toIndex(start.y);
    let startX = toIndex(start.x);
    let endY = toIndex(end.y);
    let endX = toIndex(end.x);
    if (this.clonedGrid[startY] && this.clonedGrid[endY]) {
      this.start = this.clonedGrid[startY][startX];
      this.end = this.clonedGrid[endY][endX];
    }
  }
  findPath(grid, start, end) {
    this.clonedGrid = cloneGrid(grid);

    this.updateStartAndEnd(start, end);

    this.start.g = 0;
    this.start.f = 0;
    this.start.parent = null;

    this.openSet = [];
    this.path = [];
    this.openSet.push(this.start);

    if (!this.end.walkable) return;

    while (this.openSet.length > 0) {
      let current = this.getLowestF(this.openSet);

      removeFromArray(this.openSet, current);
      current.closed = true;

      // Backtrack the path to the current path.
      if (current.x === this.end.x && current.y === this.end.y) {
        this.path.push(this.backtrackPath(current));
        return this.backtrackPath(current);
      }

      let neigbours = current.getNeighbors(this.clonedGrid);

      for (let i = 0; i < neigbours.length; i++) {
        let neigbor = neigbours[i];

        if (neigbor.closed || !neigbor.walkable) {
          continue;
        }

        let possibleG = current.g;

        if (neigbor.x !== current.x && neigbor.y !== current.y) {
          if (
            this.clonedGrid[current.y][neigbor.x].walkable &&
            this.clonedGrid[neigbor.y][current.x].walkable
          ) {
            possibleG += 1.5;
          } else {
            continue;
          }
        } else {
          possibleG += 1;
        }

        if (!this.openSet.includes(neigbor) || possibleG < neigbor.g) {
          neigbor.g = possibleG;
          neigbor.h = calculateH(neigbor, this.end);
          neigbor.f = neigbor.g + neigbor.h;
          neigbor.parent = current;
          if (!this.openSet.includes(neigbor)) {
            this.openSet.push(neigbor);
          }
        }
      }
    }

    return [];
  }

  /**
   * @param current
   *
   * @return The path from the root
   */
  backtrackPath(current) {
    let path = [];
    path.push(current);
    while (current.parent !== null) {
      current = current.parent;
      path.push(current);
    }

    return path.reverse();
  }
  getLowestF(arr) {
    let lowestF = arr[0];
    // Find the lowest F of the array
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].f < lowestF.f) {
        lowestF = arr[i];
      }
    }
    return lowestF;
  }
  drawPath(ctx) {
    this.openSet.forEach((tile) => {
      ctx.fillStyle = "purple";
      tile.draw(ctx);
    });

    this.path.forEach((arr) => {
      arr.forEach((tile) => {
        ctx.fillStyle = "black";
        tile.draw(ctx);
      });
    });
  }
}
