export function checkX(entity, grid) {
  let x;
  if (entity.velocityX > 0) {
    x = entity.top;
  } else if (entity.velocityX < 0) {
    x = entity.x;
  } else {
    return;
  }

  const tiles = grid.searchTilesInRange(x, x, entity.y, entity.left);

  tiles.forEach((tile) => {
    const tileX1 = tile.x * tile.tileSize;
    const tileX2 = tileX1 + tile.tileSize;

    if (!tile.walkable) {
      return;
    }

    if (entity.velocityX > 0) {
      if (entity.top > tileX1) {
        entity.x = tileX1 - entity.width;
        entity.velocityX = 0;
        entity.collide = true;
      }
    } else if (entity.velocityX < 0) {
      if (entity.x < tileX2) {
        entity.x = tileX2;
        entity.velocityX = 0;
        entity.collide = true;
      }
    }
  });
}

export function checkY(entity, grid) {
  let y;
  if (entity.velocityY > 0) {
    y = entity.left;
  } else if (entity.velocityY < 0) {
    y = entity.y;
  } else {
    return;
  }

  const tiles = grid.searchTilesInRange(entity.x, entity.top, y, y);

  tiles.forEach((tile) => {
    const tileY1 = tile.y * tile.tileSize;
    const tileY2 = tileY1 + tile.tileSize;
    if (!tile.walkable) {
      return;
    }

    if (entity.velocityY > 0) {
      if (entity.left > tileY1) {
        entity.y = tileY1 - entity.height;
        entity.velocityY = 0;
        entity.collide = true;
      }
    } else if (entity.velocityY < 0) {
      if (entity.y < tileY2) {
        entity.y = tileY2;
        entity.velocityY = 0;
        entity.collide = true;
      }
    }
  });
}
