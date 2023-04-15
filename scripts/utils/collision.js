export function checkCollision(entity, grid) {
  const tileHalf = grid.tileSize / 2;

  // Check X-axis collision
  if (entity.velocityX !== 0) {
    let x;
    if (entity.velocityX > 0) {
      x = entity.right;
    } else {
      x = entity.left;
    }

    const tiles = grid.searchTilesInRange(
      x - tileHalf,
      x + tileHalf,
      entity.top,
      entity.bottom
    );

    tiles.forEach((tile) => {
      if (tile.walkable) {
        return;
      }

      if (entity.velocityX > 0) {
        if (
          entity.right + entity.velocityX > tile.left &&
          entity.left < tile.left
        ) {
          entity.velocityX = tile.left - entity.right;
          entity.collide = true;
        }
      } else {
        if (
          entity.left + entity.velocityX < tile.right &&
          entity.right > tile.right
        ) {
          entity.velocityX = tile.right - entity.left;
          entity.collide = true;
        }
      }
    });
  }

  // Check Y-axis collision
  if (entity.velocityY !== 0) {
    let y;
    if (entity.velocityY > 0) {
      y = entity.bottom;
    } else {
      y = entity.top;
    }

    const tiles = grid.searchTilesInRange(
      entity.left,
      entity.right,
      y - tileHalf,
      y + tileHalf
    );

    tiles.forEach((tile) => {
      if (tile.walkable) {
        return;
      }

      if (entity.velocityY > 0) {
        if (
          entity.bottom + entity.velocityY > tile.top &&
          entity.top < tile.top
        ) {
          entity.velocityY = tile.top - entity.bottom;
          entity.collide = true;
        }
      } else {
        if (
          entity.top + entity.velocityY < tile.bottom &&
          entity.bottom > tile.bottom
        ) {
          entity.velocityY = tile.bottom - entity.top;
          entity.collide = true;
        }
      }
    });
  }
}
