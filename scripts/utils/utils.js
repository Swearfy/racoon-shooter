//Returns the position as an index based on given tile size
export function toIndex(pos, tileSize) {
  let newPos = Math.floor(pos / tileSize);
  return newPos;
}

// Returns a range of positions based on given tile size and 2 positions
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
