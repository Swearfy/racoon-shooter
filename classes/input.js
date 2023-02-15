export class Input {
  constructor() {
    this.p1Keys = {
      w: false,
      s: false,
      a: false,
      d: false,
      t: false,
      g: false,
      f: false,
      h: false,
    };
    this.p2Keys = {
      i: false,
      k: false,
      j: false,
      l: false,
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
    document.addEventListener("keydown", (e) => {
      this.p1Keys[e.key] = true;
      this.p2Keys[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.p1Keys[e.key] = false;
      this.p2Keys[e.key] = false;
    });
  }
}
