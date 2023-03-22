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
      console.log("conected");
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      this.controllerIndex = null;
      console.log("discon");
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

      if (axisX >= stickDeadZone) {
        keys.right.pressed = true;
      } else if (axisX <= stickDeadZone) {
        keys.right.pressed = false;
      }

      if (axisX <= -stickDeadZone) {
        keys.left.pressed = true;
      } else if (axisX >= -stickDeadZone) {
        keys.left.pressed = false;
      }

      if (axisY >= stickDeadZone) {
        keys.down.pressed = true;
      } else if (axisY <= stickDeadZone) {
        keys.down.pressed = false;
      }

      if (axisY <= -stickDeadZone) {
        keys.up.pressed = true;
      } else if (axisY >= -stickDeadZone) {
        keys.up.pressed = false;
      }

      if (shootAxisX >= stickDeadZone) {
        keys.shootRight.pressed = true;
      } else if (shootAxisX <= stickDeadZone) {
        keys.shootRight.pressed = false;
      }

      if (shootAxisX <= -stickDeadZone) {
        keys.shootLeft.pressed = true;
      } else if (shootAxisX >= -stickDeadZone) {
        keys.shootLeft.pressed = false;
      }

      if (shootAxisY >= stickDeadZone) {
        keys.shootDown.pressed = true;
      } else if (shootAxisY <= stickDeadZone) {
        keys.shootDown.pressed = false;
      }

      if (shootAxisY <= -stickDeadZone) {
        keys.shootUp.pressed = true;
      } else if (shootAxisY >= -stickDeadZone) {
        keys.shootUp.pressed = false;
      }
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
