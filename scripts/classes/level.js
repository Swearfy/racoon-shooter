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
        if (level[row][col].isWalkable === 1) {
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
      block.draw(ctx, "red");
    });

    // // draw blocks around player

    // this.rangetiles.forEach((block) => {
    //   let newBLock = new RedBlock(block.x1, block.y1);
    //   newBLock.draw(ctx);
    // });
  }
}
