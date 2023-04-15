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
 * @param grid - The grid to search in
 * @param x - The x position of the tile to search in
 * @param y - The y position of the tile to search in
 *
 * @return The tile at the position or a new tile if none is found at that position
 */
export function getTileAtIndex(grid, x, y) {
  let tile = grid[y]?.[x];
  if (tile) {
    return tile;
  }
  return new Tile(x, y, 30, false);
}

/**
 *
 * @param entity1
 * @param entity2
 * @returns Octile distance between 2 points
 */
export function calculateH(entity1, entity2) {
  let dx = Math.abs(entity1.x - entity2.x);
  let dy = Math.abs(entity1.y - entity2.y);
  return 1 * (dx + dy) + (Math.SQRT2 - 2 * 1) * Math.min(dx, dy);
}

/**
 *  Clones the given grid.
 * @param grid
 * @returns cloed grid
 */
export function cloneGrid(grid) {
  let clone = [];
  // Creates a clone of the grid.
  for (let row = 0; row < grid.length; row++) {
    clone[row] = [];
    for (let col = 0; col < grid[row].length; col++) {
      const tile = grid[row][col];
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
