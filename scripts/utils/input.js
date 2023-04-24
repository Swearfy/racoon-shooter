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
      up: { key: "t", pressed: false },
      down: { key: "g", pressed: false },
      left: { key: "f", pressed: false },
      right: { key: "h", pressed: false },
      shootUp: { key: "i", pressed: false },
      shootDown: { key: "k", pressed: false },
      shootLeft: { key: "l", pressed: false },
      shootRight: { key: "j", pressed: false },
    };
    this.controllerIndex = null;

    window.addEventListener("gamepadconnected", (e) => {
      this.controllerIndex = e.gamepad.index;
      console.log("connected");
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      this.controllerIndex = null;
      console.log("disconnected");
    });
  }

  controllerInput(keys) {
    if (this.controllerIndex !== null) {
      const gamepad = navigator.getGamepads()[this.controllerIndex];

      const stickDeadZone = 0.4;
      const axisX = gamepad.axes[0];
      const axisY = gamepad.axes[1];

      const shootAxisX = gamepad.axes[2];
      const shootAxisY = gamepad.axes[5];

      keys.right.pressed = axisX >= stickDeadZone;
      keys.left.pressed = axisX < -stickDeadZone;
      keys.down.pressed = axisY >= stickDeadZone;
      keys.up.pressed = axisY < -stickDeadZone;

      keys.shootRight.pressed = shootAxisX >= stickDeadZone;
      keys.shootLeft.pressed = shootAxisX < -stickDeadZone;
      keys.shootDown.pressed = shootAxisY >= stickDeadZone;
      keys.shootUp.pressed = shootAxisY < -stickDeadZone;
    }
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
