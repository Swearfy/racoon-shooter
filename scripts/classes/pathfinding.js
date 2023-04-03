import { calculateH, toIndex } from "../utils/utils.js";

export class Pathfinding {
  constructor() {
    this.openList = [];
    this.closeList = [];
    this.start;
    this.end;
    this.pathGrid = [];
  }
  findPath(grid, startX, startY, endX, endY) {
    // let startY = toIndex(start.y, 30);
    // let startX = toIndex(start.x, 30);
    // let endY = toIndex(end.y, 30);
    // let endX = toIndex(end.x, 30);

    this.pathGrid = cloneGrid(grid);
    this.start = this.pathGrid[startY][startX];
    this.end = this.pathGrid[endY][endX];

    this.start.g = 0;
    this.start.f = 0;

    this.openList.push(this.start);

    if (!this.end.walkable) {
      return;
    }

    while (this.openList.length > 0) {
      let current = this.getLowestF(this.openList);

      this.removeFromArray(this.openList, current);
      this.closeList.push(current);

      // Backtrack the path to the current path.
      if (current.x === this.end.x && current.y === this.end.y) {
        return this.backtrackPath(current);
      }

      let neigbours = current.getNeighbors(this.pathGrid);

      for (let i = 0; i < neigbours.length; i++) {
        let neigbor = neigbours[i];

        if (!neigbor.walkable || this.closeList.includes(neigbor)) {
          continue;
        }

        let tempG = current.g + 1;

        // This method is used to calculate the G value of the neigbor.
        if (tempG < neigbor.g) {
          neigbor.parent = current;
          neigbor.g = tempG;
          neigbor.h = calculateH(neigbor, this.end);
          neigbor.f = neigbor.g + neigbor.h;

          // Add a neigbor to the open list
          if (!this.openList.includes(neigbor)) {
            this.openList.push(neigbor);
          }
        }
      }
    }

    return "Path was never found";
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
  removeFromArray(arr, elm) {
    let i = arr.indexOf(elm);
    return arr.splice(i, 1);
  }
}

/**
 *  Clones the given grid.
 * @param grid
 * @returns {Array}
 */
function cloneGrid(grid) {
  let clone = [];
  // Creates a clone of the grid.
  for (let row = 0; row < grid.length; row++) {
    clone[row] = [];
    for (let col = 0; col < grid[row].length; col++) {
      clone[row][col] = grid[row][col];
    }
  }
  return clone;
}
