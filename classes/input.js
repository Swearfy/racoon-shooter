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

// const player1Keys = { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" };
// const player2Keys = { up: "w", down: "s", left: "a", right: "d" };

// // Define player objects with initial positions and velocities
// const player1 = { x: 0, y: 0, vx: 0, vy: 0 };
// const player2 = { x: 10, y: 10, vx: 0, vy: 0 };

// // Define function to handle key presses
// function handleKeyPress(event, playerKeys, player) {
//   if (event.key === playerKeys.up) {
//     player.vy = -1;
//   } else if (event.key === playerKeys.down) {
//     player.vy = 1;
//   } else if (event.key === playerKeys.left) {
//     player.vx = -1;
//   } else if (event.key === playerKeys.right) {
//     player.vx = 1;
//   }
// }
