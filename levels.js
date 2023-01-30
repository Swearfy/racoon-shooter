const levels = {
  1: (image = new Image("./img/map1resolutionfix.png")),
  2: "",
};

export class Levels {
  constructor(level) {
    this.level = level;
    this.position = this.position;
  }
  draw(ctx) {
    ctx.drawImage(levels[this.level], 0, 0);
  }
}
