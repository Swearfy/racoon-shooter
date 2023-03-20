import { level } from "./tileMaps.js";

export class Level {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.image = document.getElementById("level1");
    this.blocks = [];
    this.level = level;
    this.rangetiles = [];
    this.playerX = 0;
    this.playerY = 0;

    for (let row = 0; row < level.length; row++) {
      for (let col = 0; col < level[row].length; col++) {
        if (level[row][col] === 1) {
          this.blocks.push(new RedBlock(col * 30, row * 30));
        }
      }
    }
  }
  update(player) {
    this.playerX = Math.floor(player.x / 30);
    this.playerY = Math.floor(player.y / 30);

    this.rangetiles = this.getTileAtIndexByRange(player, this.level);
    console.log(this.rangetiles);
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);

    // draw collision blocks
    this.blocks.forEach((block) => {
      ctx.strokeStyle = "black";
      block.draw(ctx);
    });

    // draw blocks around player
    for (let row = 0; row < this.rangetiles.length; row++) {
      for (let column = 0; column < this.rangetiles[row].length; column++) {
        if (this.rangetiles[row][column] === 0) {
          ctx.strokeStyle = "green";
        } else {
          ctx.strokeStyle = "red";
        }

        let block = new RedBlock(
          (this.playerX + column) * 30,
          (this.playerY + row) * 30
        );
        block.draw(ctx);
      }
    }
  }
  getTileAtIndex(x, y, tileMap) {
    return tileMap[y][x];
  }
  getTileAtIndexByRange(player, tileMap, tileSize = 30, tileRadius = 1) {
    const tilesInRange = [];

    let x1 = Math.floor(player.x / tileSize);
    let x2 = Math.ceil((player.x + player.width) / tileSize);
    let y1 = Math.floor(player.y / tileSize);
    let y2 = Math.ceil((player.y + player.height) / tileSize);

    for (let y = y1; y < y2; y++) {
      const row = [];
      for (let x = x1; x < x2; x++) {
        if (tileMap[y] === undefined) {
          break;
        } else {
          row.push(tileMap[y][x]);
        }
      }
      tilesInRange.push(row);
    }
    return tilesInRange;
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
