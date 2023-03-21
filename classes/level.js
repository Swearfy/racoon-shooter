import { level } from "./tileMaps.js";

export class Level {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.image = document.getElementById("level1");
    this.tileMap = level;
    this.blocks = [];
    this.rangetiles = [];
    this.playerX = 0;
    this.playerY = 0;
    this.tileSize = 30;

    for (let row = 0; row < level.length; row++) {
      for (let col = 0; col < level[row].length; col++) {
        if (level[row][col] === 1) {
          this.blocks.push(new RedBlock(col * 30, row * 30));
        }
      }
    }
  }
  update(player) {
    let x1 = player.x;
    let x2 = player.x + player.width;
    let y1 = player.y;
    let y2 = player.y + player.height;

    this.rangetiles = this.searchTilesInRange(x1, x2, y1, y2);
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);

    // draw collision blocks
    this.blocks.forEach((block) => {
      ctx.strokeStyle = "black";
      block.draw(ctx);
    });

    // draw blocks around player

    this.rangetiles.forEach((block) => {
      let newBLock = new RedBlock(block.x1, block.y1);
      newBLock.draw(ctx);
    });
  }
  getAt(x, y) {
    const row = this.tileMap[y];
    if (row) {
      return row[x];
    }
    return undefined;
  }
  toIndex(pos) {
    return Math.floor(pos / this.tileSize);
  }
  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range = [];
    let pos = pos1;

    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);
    return range;
  }

  getTileAtIndex(x, y) {
    const tile = this.getAt(x, y);

    const x1 = x * this.tileSize;
    const x2 = x1 + this.tileSize;
    const y1 = y * this.tileSize;
    const y2 = y1 + this.tileSize;
    return {
      tile,
      x1,
      x2,
      y1,
      y2,
    };
  }
  searchTilesInRange(x1, x2, y1, y2) {
    const tilesInRange = [];

    this.toIndexRange(y1, y2).forEach((y) => {
      this.toIndexRange(x1, x2).forEach((x) => {
        tilesInRange.push(this.getTileAtIndex(x, y));
      });
    });

    return tilesInRange;
  }
  checkX(entity) {
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
        }
      } else if (entity.velocityX < 0) {
        if (entity.x < tile.x2) {
          entity.x = tile.x2;
          entity.velocityX = 0;
        }
      }
    });
  }

  checkY(entity) {
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
        }
      } else if (entity.velocityY < 0) {
        if (entity.y < tile.y2) {
          entity.y = tile.y2;
          entity.velocityY = 0;
        }
      }
    });
  }
}

class RedBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
  }
  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
