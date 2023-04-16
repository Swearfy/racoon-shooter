export class Sprite {
  constructor(entity, frameLimit) {
    this.entity = entity;
    this.state = "idle";
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
    };
    this.animationFrameLimit = frameLimit;
    this.frameProgres = 0;
  }
  get frame() {
    return this.animations[this.state][this.currentFrame];
  }
  setAnimation() {
    if (this.entity.velocityX > 0) {
      this.entity.setState("moveRight");
    } else if (this.entity.velocityX < 0) {
      this.entity.setState("moveLeft");
    } else {
      this.entity.setState("idle");
    }

    if (this.state !== this.entity.state) {
      console.log(this.state, this.entity.state);
      this.state = this.entity.state;
      this.currentFrame = 0;
      this.frameProgres = this.animationFrameLimit;
    }
  }
  updateAnimationProgress() {
    //Downtick frame progress
    if (this.frameProgres > 0) {
      this.frameProgres -= 1;
      return;
    }

    //Reset the counter
    this.frameProgres = this.animationFrameLimit;
    this.currentFrame += 1;

    if (this.frame === undefined) {
      this.currentFrame = 0;
    }
  }
  draw(ctx) {
    const x = this.entity.x - this.entity.offsetX;
    const y = this.entity.y - this.entity.offsetY;
    const framePos = this.frame;
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
    this.updateAnimationProgress();
  }
}
