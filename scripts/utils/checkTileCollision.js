export function checkTileCollision(gameObject, grid) {
  const tileHalf = grid.tileSize / 2;

  // Check X-axis collision
  if (gameObject.velocityX !== 0) {
    let x;
    if (gameObject.velocityX > 0) {
      x = gameObject.right;
    } else {
      x = gameObject.left;
    }

    const tiles = grid.searchTilesInRange(
      x - tileHalf,
      x + tileHalf,
      gameObject.top,
      gameObject.bottom
    );

    tiles.forEach((tile) => {
      if (tile.walkable) {
        return;
      }

      if (gameObject.velocityX > 0) {
        if (
          gameObject.right + gameObject.velocityX > tile.left &&
          gameObject.left < tile.left
        ) {
          gameObject.velocityX = tile.left - gameObject.right;
          gameObject.collide = true;
        }
      } else {
        if (
          gameObject.left + gameObject.velocityX < tile.right &&
          gameObject.right > tile.right
        ) {
          gameObject.velocityX = tile.right - gameObject.left;
          gameObject.collide = true;
        }
      }
    });
  }

  // Check Y-axis collision
  if (gameObject.velocityY !== 0) {
    let y;
    if (gameObject.velocityY > 0) {
      y = gameObject.bottom;
    } else {
      y = gameObject.top;
    }

    const tiles = grid.searchTilesInRange(
      gameObject.left,
      gameObject.right,
      y - tileHalf,
      y + tileHalf
    );

    tiles.forEach((tile) => {
      if (tile.walkable) {
        return;
      }

      if (gameObject.velocityY > 0) {
        if (
          gameObject.bottom + gameObject.velocityY > tile.top &&
          gameObject.top < tile.top
        ) {
          gameObject.velocityY = tile.top - gameObject.bottom;
          gameObject.collide = true;
        }
      } else {
        if (
          gameObject.top + gameObject.velocityY < tile.bottom &&
          gameObject.bottom > tile.bottom
        ) {
          gameObject.velocityY = tile.bottom - gameObject.top;
          gameObject.collide = true;
        }
      }
    });
  }
}
