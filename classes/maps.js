import { Level1Collision, Level2Collision } from "../mapCollisionData.js";
// to do : image import find better way
const map1 = new Image();
map1.src = "./img/map1resolutionfix.png";
const map2 = new Image();
map2.src = "/img/ratonstepleftscalefix.png";

// map image and tile map object
export const levels = {
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

    // draw collision based on tile map from mapCollisionData.js or object above
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
    //private function to draw red rectangles on to the canvas to use for collision
    ctx.fillStyle = "red";
    ctx.fillRect(columm * 30, row * 30, 30, 30);
  }
}
