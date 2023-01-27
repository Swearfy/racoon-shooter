export class MapSprite {
  constructor({ position, image }) {
    this.position = position;
    this.image = new Image();
    this.image.src = image;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
