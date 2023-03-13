export class Input {
  constructor() {
    this.player1Keys = {
      up: { key: "w", pressed: false },
      down: { key: "s", pressed: false },
      left: { key: "a", pressed: false },
      right: { key: "d", pressed: false },
      shootUp: { key: "ArrowUp", pressed: false },
      shootDown: { key: "ArrowDown", pressed: false },
      shootLeft: { key: "ArrowLeft", pressed: false },
      shootRight: { key: "ArrowRight", pressed: false },
    };
    this.player2Keys = {
      up: { key: "w", pressed: false },
      down: { key: "s", pressed: false },
      left: { key: "a", pressed: false },
      right: { key: "d", pressed: false },
      shootUp: { key: "ArrowUp", pressed: false },
      shootDown: { key: "ArrowDown", pressed: false },
      shootLeft: { key: "ArrowLeft", pressed: false },
      shootRight: { key: "ArrowRight", pressed: false },
    };
  }
  inputControl(keys) {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case keys.up.key:
          keys.up.pressed = true;
          break;
        case keys.down.key:
          keys.down.pressed = true;
          break;
        case keys.left.key:
          keys.left.pressed = true;
          break;
        case keys.right.key:
          keys.right.pressed = true;
          break;
        case keys.shootUp.key:
          keys.shootUp.pressed = true;
          break;
        case keys.shootDown.key:
          keys.shootDown.pressed = true;
          break;
        case keys.shootLeft.key:
          keys.shootLeft.pressed = true;
          break;
        case keys.shootRight.key:
          keys.shootRight.pressed = true;
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case keys.up.key:
          keys.up.pressed = false;
          break;
        case keys.down.key:
          keys.down.pressed = false;
          break;
        case keys.left.key:
          keys.left.pressed = false;
          break;
        case keys.right.key:
          keys.right.pressed = false;
          break;
        case keys.shootUp.key:
          keys.shootUp.pressed = false;
          break;
        case keys.shootDown.key:
          keys.shootDown.pressed = false;
          break;
        case keys.shootLeft.key:
          keys.shootLeft.pressed = false;
          break;
        case keys.shootRight.key:
          keys.shootRight.pressed = false;
          break;
        default:
          break;
      }
    });
  }
}
