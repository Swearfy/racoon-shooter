// player 1 keys
const p1Keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

//player 2 keys
const p2Keys = {
  y: {
    pressed: false,
  },
  h: {
    pressed: false,
  },
  g: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
};

export class Input {
  constructor(game) {
    this.game = game;
    this.p1Keys = p1Keys;
    this.p2Keys = p2Keys;

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        //player 1
        case "w":
          this.p1Keys.w.pressed = true;
          break;
        case "s":
          this.p1Keys.s.pressed = true;
          break;
        case "a":
          this.p1Keys.a.pressed = true;
          break;
        case "d":
          this.p1Keys.d.pressed = true;
          break;
        case "ArrowUp":
          this.p1Keys.ArrowUp.pressed = true;
          break;
        case "ArrowDown":
          this.p1Keys.ArrowDown.pressed = true;
          break;
        case "ArrowLeft":
          this.p1Keys.ArrowLeft.pressed = true;
          break;
        case "ArrowRight":
          this.p1Keys.ArrowRight.pressed = true;
          break;

        //player 2
        case "y":
          this.p2Keys.y.pressed = true;
          break;
        case "h":
          this.p2Keys.h.pressed = true;
          break;
        case "g":
          this.p2Keys.g.pressed = true;
          break;
        case "j":
          this.p2Keys.j.pressed = true;
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        //player 1
        case "w":
          this.p1Keys.w.pressed = false;
          break;
        case "s":
          this.p1Keys.s.pressed = false;
          break;
        case "a":
          this.p1Keys.a.pressed = false;
          break;
        case "d":
          this.p1Keys.d.pressed = false;
          break;
        case "ArrowUp":
          this.p1Keys.ArrowUp.pressed = false;
          break;
        case "ArrowDown":
          this.p1Keys.ArrowDown.pressed = false;
          break;
        case "ArrowLeft":
          this.p1Keys.ArrowLeft.pressed = false;
          break;
        case "ArrowRight":
          this.p1Keys.ArrowRight.pressed = false;
          break;

        //player 2
        case "y":
          this.p2Keys.y.pressed = false;
          break;
        case "h":
          this.p2Keys.h.pressed = false;
          break;
        case "g":
          this.p2Keys.g.pressed = false;
          break;
        case "j":
          this.p2Keys.j.pressed = false;
          break;
      }
    });
  }
}
