import { Tile } from "../classes/tile.js";
/**
 * Returns the position as an index based on given tile size
 * @param pos
 * @param tileSize
 * @returns
 */
export function toIndex(pos, tileSize = 30) {
  let newPos = Math.floor(pos / tileSize);
  return newPos;
}

/**
 * Converts a range of positions to an array of tile indices.
 *
 * @param pos1 - First position in the range
 * @param pos2 - Second position in the range
 * @param tileSize - Size of each tile in pixels.
 *
 * @return  Array of tile indices that correspond to the range of positions on the map
 */
export function toIndexRange(pos1, pos2, tileSize) {
  const maxPos = Math.ceil(pos2 / tileSize) * tileSize;
  const range = [];
  let pos = pos1;

  do {
    range.push(toIndex(pos));
    pos += tileSize;
  } while (pos < maxPos);
  return range;
}

/**
 * Gets the tile at the x y position. If there is no tile at that position a empty tile is returned
 *
 * @param matrix - The matrix to search in
 * @param x - The x position of the tile to search in
 * @param y - The y position of the tile to search in
 *
 * @return The tile at the position or a new tile if none is found at that position
 */
export function getTileAtIndex(matrix, x, y) {
  let tile = matrix[y]?.[x];
  if (tile) {
    return tile;
  }
  return new Tile(x, y, 30, false);
}

/**
 *
 * @param gameObject1
 * @param gameObject2
 * @returns Octile distance between 2 points
 */
export function calculateH(gameObject1, gameObject2) {
  let dx = Math.abs(gameObject1.x - gameObject2.x);
  let dy = Math.abs(gameObject1.y - gameObject2.y);
  return 1 * (dx + dy) + (Math.SQRT2 - 2 * 1) * Math.min(dx, dy);
}

/**
 *  Clones the given matrix.
 * @param matrix
 * @returns closed matrix
 */
export function cloneMatrix(matrix) {
  let clone = [];
  // Creates a clone of the matrix.
  for (let row = 0; row < matrix.length; row++) {
    clone[row] = [];
    for (let col = 0; col < matrix[row].length; col++) {
      const tile = matrix[row][col];
      if (tile) {
        clone[row][col] = tile.clone();
      }
    }
  }
  return clone;
}

export function removeFromArray(arr, elm) {
  let i = arr.indexOf(elm);
  return arr.splice(i, 1);
}

/**
 *
 * @param {*} x
 * @param {*} y
 * @param {*} type
 * @returns if tile is blocked
 */

export function isBlocked(x, y, gameObject, level) {
  const tileInRange = level.searchTilesInRange(
    x,
    x + gameObject.width,
    y,
    y + gameObject.height
  );

  for (let i = 0; i < tileInRange.length; i++) {
    const tile = tileInRange[i];
    if (!tile.walkable) {
      return true;
    }
  }
  return false;
}

/**
 * Probability chance of spawning/ dropping game object
 * @param {*} array
 * @returns gameObject
 */
export function getSpawnChance(arr, game) {
  const randomNumber = Math.random() * 100;
  let probability = 0;

  for (let i = 0; i < arr.length; i++) {
    probability += arr[i].spawnChance;
    if (randomNumber <= probability) {
      return game.gameObjects[arr[i].type];
    }
  }
}
