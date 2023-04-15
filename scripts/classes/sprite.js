export class Sprite {
  constructor(entity, state) {
    this.entity = entity;
    this.state = state || state;
    this.currentFrame = 0;
    this.animations = {
      idle: [{ x: 0, y: 0 }],
      moveRight: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      moveLeft: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      moveUp: [],
      moveDown: [],
    };
  }
  get frame() {
    return this.animations[this.state][this.currentFrame];
  }
  draw(ctx) {
    const x = this.entity.x;
    const y = this.entity.y;
    const framePos = this.frame;
    console.log(this.animations[this.state][this.currentFrame]);
    ctx.drawImage(
      this.entity.image,
      framePos.x,
      framePos.y,
      this.entity.spriteWidth,
      this.entity.spriteHeight,
      x,
      y,
      this.entity.spriteWidth,
      this.entity.spriteWidth
    );
    ctx.fillStyle = "black";

    ctx.strokeRect(
      this.entity.x,
      this.entity.y,
      this.entity.h,
      this.entity.spriteHeight
    );
  }
}
