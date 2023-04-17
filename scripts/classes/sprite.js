export class Sprite {
  constructor(entity, frameLimit) {
    this.entity = entity;
    this.currentFrame = 0;
    this.animations = {
      idle: [{ x: 0, y: 0 }],
      moveRight: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      moveLeft: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      moveUp: [],
      moveDown: [],
      shootLeft: [{ x: 0, y: 1 }],
    };
    this.currentFrame = 0;
    this.frameLimit = frameLimit;
  }
  getFrame(entity, currentFrame) {
    return this.animations[entity.state][currentFrame];
  }
  setAnimation() {
    if (this.entity.velocityX > 0) {
      this.entity.setState("moveRight");
    } else if (this.entity.velocityX < 0) {
      this.entity.setState("moveLeft");
    } else {
      this.entity.setState("idle");
    }
  }
  draw(ctx) {
    const x = this.entity.x - this.entity.offsetX;
    const y = this.entity.y - this.entity.offsetY;

    const animLength = this.animations[this.entity.state].length;
    let pos = Math.floor(this.currentFrame / this.frameLimit) % animLength;

    const framePos = this.getFrame(this.entity, pos);

    this.currentFrame++;
    ctx.drawImage(
      this.entity.image,
      framePos.x * this.entity.spriteWidth,
      framePos.y * this.entity.spriteHeight,
      this.entity.spriteWidth,
      this.entity.spriteHeight,
      x,
      y,
      this.entity.spriteWidth,
      this.entity.spriteHeight
    );
  }
}
