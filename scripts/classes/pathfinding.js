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
    let startY = toIndex(start.y, 30);
    let startX = toIndex(start.x, 30);
    let endY = toIndex(end.y, 30);
    let endX = toIndex(end.x, 30);

    this.start = this.clonedGrid[startY][startX];
    this.end = this.clonedGrid[endY][endX];
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

    if (!this.end.walkable) {
      return;
    }

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

        if (!neigbor.closed) {
          let possibleG = current.g + 1;

          if (!this.openSet.includes(neigbor)) {
            this.openSet.push(neigbor);
          } else if (possibleG >= neigbor.g) {
            continue;
          }
          neigbor.g = possibleG;
          neigbor.h = calculateH(neigbor, this.end);
          neigbor.f = neigbor.g + neigbor.h;
          neigbor.parent = current;
        }
      }
    }

    return [];
  }

  /**
   * @param current
   *
   * @return { Array } The path from the root
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
