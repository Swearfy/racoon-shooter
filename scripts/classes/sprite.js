export class Sprite {
  constructor(gameObject, frameLimit) {
    this.gameObject = gameObject;
    this.animations = {
      idle: [{ x: 0, y: 0 }],
      moveRight: [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      moveLeft: [
        { x: 0, y: 3 },
        { x: 1, y: 3 },
      ],
      moveUp: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      moveDown: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      shootLeft: [{ x: 0, y: 3 }],
    };
    this.currentFrame = 0;
    this.frameLimit = frameLimit;
  }
  getFrame(gameObject, currentFrame) {
    return this.animations[gameObject.state][currentFrame];
  }
  setAnimation() {
    if (this.gameObject.velocityY > 0) {
      this.gameObject.setState("moveDown");
    } else if (this.gameObject.velocityY < 0) {
      this.gameObject.setState("moveUp");
    } else if (this.gameObject.velocityX > 0) {
      this.gameObject.setState("moveRight");
    } else if (this.gameObject.velocityX < 0) {
      this.gameObject.setState("moveLeft");
    } else {
      this.gameObject.setState("idle");
    }
  }
  draw(ctx) {
    const x = this.gameObject.x - this.gameObject.offsetX;
    const y = this.gameObject.y - this.gameObject.offsetY;

    const animLength = this.animations[this.gameObject.state].length;
    let pos = Math.floor(this.currentFrame / this.frameLimit) % animLength;

    const framePos = this.getFrame(this.gameObject, pos);

    this.currentFrame++;
    ctx.drawImage(
      this.gameObject.image,
      framePos.x * this.gameObject.spriteWidth,
      framePos.y * this.gameObject.spriteHeight,
      this.gameObject.spriteWidth,
      this.gameObject.spriteHeight,
      x,
      y,
      this.gameObject.spriteWidth,
      this.gameObject.spriteHeight
    );
  }
}
