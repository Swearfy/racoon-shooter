import { Input } from "./classes/input.js";
import { Player } from "./classes/player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new Input(this);
  }
  update() {
    this.player.update();
  }
  draw(ctx) {
    this.player.draw(ctx);
  }
  movment() {
    //player 1
    if (this.input.p1Keys.d.pressed) {
      this.player.moveX(2);
    } else if (this.input.p1Keys.a.pressed) {
      this.player.moveX(-2);
    } else if (this.input.p1Keys.w.pressed) {
      this.player.moveY(-2);
    } else if (this.input.p1Keys.s.pressed) {
      this.player.moveY(2);
    }
  }
}

const game = new Game(canvas.width, canvas.height);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  game.update();
  game.movment();
  game.draw(ctx);
}

requestAnimationFrame(animate);
