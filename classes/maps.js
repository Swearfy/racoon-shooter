const map1 = new Image();
map1.src = "./img/map1resolutionfix.png";
const map2 = new Image();
map2.src = "/img/ratonstepleftscalefix.png";

const levels = {
  1: map1,
  2: map2,
};

export class Map {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.image = levels[1];
  }
  update(currentLevel) {
    this.image = levels[currentLevel];
  }
  draw(ctx) {
    ctx.drawImage(this.image, 0, 0);
  }
}
