import { Level1Collision, Level2Collision } from "../mapCollisionData.js";
const map1 = new Image();
map1.src = "./img/map1resolutionfix.png";
const map2 = new Image();
map2.src = "/img/ratonstepleftscalefix.png";

const levels = {
  1: {
    image: map1,
    tileMap: Level1Collision,
  },
  2: {
    image: map2,
    tileMap: Level2Collision,
  },
};

export class Map {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
  }
  update(currentLevel) {
    this.image = levels[currentLevel].image;
  }
  draw(ctx, currentLevel) {
    ctx.drawImage(levels[currentLevel].image, 0, 0);

    for (let row = 0; row < levels[currentLevel].tileMap.length; row++) {
      for (
        let column = 0;
        column < levels[currentLevel].tileMap[row].length;
        column++
      ) {
        let tile = levels[currentLevel].tileMap[row][column];
        if (tile === 901) {
          this.#drawCollision(ctx, column, row);
        }
      }
    }
  }
  #drawCollision(ctx, columm, row) {
    ctx.fillStyle = "red";
    ctx.fillRect(columm * 30, row * 30, 30, 30);
  }
}
class RedBlock {
  constructor({ position }) {
    this.position = position;
    this.width = 30;
    this.height = 30;
  }
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
