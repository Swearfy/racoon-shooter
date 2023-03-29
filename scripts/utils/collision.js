function checkX(entity, tiles) {
  let x;
  if (entity.velocityX > 0) {
    x = entity.x + entity.width;
  } else if (entity.velocityX < 0) {
    x = entity.x;
  } else {
    return;
  }

  const tiles = this.searchTilesInRange(
    x,
    x,
    entity.y,
    entity.y + entity.height
  );

  tiles.forEach((tile) => {
    if (tile.tile !== 1) {
      return;
    }

    if (entity.velocityX > 0) {
      if (entity.x + entity.width > tile.x1) {
        entity.x = tile.x1 - entity.width;
        entity.velocityX = 0;
        entity.collide = true;
      }
    } else if (entity.velocityX < 0) {
      if (entity.x < tile.x2) {
        entity.x = tile.x2;
        entity.velocityX = 0;
        entity.collide = true;
      }
    }
  });
}

function checkY(entity, tiles) {
  let y;
  if (entity.velocityY > 0) {
    y = entity.y + entity.height;
  } else if (entity.velocityY < 0) {
    y = entity.y;
  } else {
    return;
  }

  const tiles = this.searchTilesInRange(
    entity.x,
    entity.x + entity.width,
    y,
    y
  );

  tiles.forEach((tile) => {
    if (tile.tile !== 1) {
      return;
    }

    if (entity.velocityY > 0) {
      if (entity.y + entity.height > tile.y1) {
        entity.y = tile.y1 - entity.height;
        entity.velocityY = 0;
        entity.collide = true;
      }
    } else if (entity.velocityY < 0) {
      if (entity.y < tile.y2) {
        entity.y = tile.y2;
        entity.velocityY = 0;
        entity.collide = true;
      }
    }
  });
}
