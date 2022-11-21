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
};

//player 2 keys
const p2Keys = {
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
};

export class Input {
  constructor(game) {
    this.game = game;
    this.p1Keys = p1Keys;

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
      }
    });
  }
}
