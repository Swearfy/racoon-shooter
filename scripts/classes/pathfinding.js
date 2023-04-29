import {
  calculateH,
  cloneMatrix,
  removeFromArray,
  toIndex,
} from "../utils/utils.js";

export class Pathfinding {
  constructor() {
    this.start;
    this.target;
    this.openSet = [];
    this.closedSet = [];
    this.path = [];
    this.clonedMatrix = [];
  }
  updateStartAndTarget(start, target) {
    let startY = toIndex(start.y);
    let startX = toIndex(start.x);
    let targetY = toIndex(target.y);
    let targetX = toIndex(target.x);
    if (this.clonedMatrix[startY] && this.clonedMatrix[targetY]) {
      this.start = this.clonedMatrix[startY][startX];
      this.target = this.clonedMatrix[targetY][targetX];
    }
  }
  findPath(matrix, start, target) {
    this.clonedMatrix = cloneMatrix(matrix);

    this.updateStartAndTarget(start, target);

    if (this.start === undefined || this.target === undefined) {
      return;
    }
    this.start.g = 0;
    this.start.f = 0;
    this.start.parent = null;

    this.openSet = [];
    this.path = [];
    this.openSet.push(this.start);

    if (!this.target.walkable) return;

    while (this.openSet.length > 0) {
      let current = this.getLowestF(this.openSet);

      removeFromArray(this.openSet, current);
      current.closed = true;

      // Backtrack the path to the current path.
      if (current.x === this.target.x && current.y === this.target.y) {
        this.path.push(this.backtrackPath(current));
        return this.backtrackPath(current);
      }

      let neighbors = current.getNeighbors(this.clonedMatrix);

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        if (neighbor.closed || !neighbor.walkable) {
          continue;
        }

        let possibleG = current.g;

        if (neighbor.x !== current.x && neighbor.y !== current.y) {
          if (
            this.clonedMatrix[current.y][neighbor.x].walkable &&
            this.clonedMatrix[neighbor.y][current.x].walkable
          ) {
            possibleG += 1.5;
          } else {
            continue;
          }
        } else {
          possibleG += 1;
        }

        if (!this.openSet.includes(neighbor) || possibleG < neighbor.g) {
          neighbor.g = possibleG;
          neighbor.h = calculateH(neighbor, this.target);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          if (!this.openSet.includes(neighbor)) {
            this.openSet.push(neighbor);
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
