export class Input {
  constructor(playerIndex) {
    this.playerIndex = playerIndex;
    this.controllerIndex = this.playerIndex - 1;

    this.playerControls = {
      1: {
        up: { key: "w", pressed: false },
        down: { key: "s", pressed: false },
        left: { key: "a", pressed: false },
        right: { key: "d", pressed: false },
        shootUp: { key: "ArrowUp", pressed: false },
        shootDown: { key: "ArrowDown", pressed: false },
        shootLeft: { key: "ArrowLeft", pressed: false },
        shootRight: { key: "ArrowRight", pressed: false },
      },
      2: {
        up: { key: "t", pressed: false },
        down: { key: "g", pressed: false },
        left: { key: "f", pressed: false },
        right: { key: "h", pressed: false },
        shootUp: { key: "i", pressed: false },
        shootDown: { key: "k", pressed: false },
        shootLeft: { key: "l", pressed: false },
        shootRight: { key: "j", pressed: false },
      },
    };

    window.addEventListener("keydown", (e) => this.setPressedKey(e, true));
    window.addEventListener("keyup", (e) => this.setPressedKey(e, false));

    window.addEventListener("gamepadconnected", (e) => {
      console.log("connected");
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      console.log("disconnected");
    });
  }
  setPressedKey(e, status) {
    Object.values(this.playerControls).forEach((setOfKeys) => {
      Object.values(setOfKeys).forEach((action) => {
        const event = e.key.toLowerCase();
        const keyToCheck = action.key.toLowerCase();
        if (event === keyToCheck) {
          action.pressed = status;
        }
      });
    });
  }
  controllerInput() {
    const gamepad = navigator.getGamepads()[this.controllerIndex];
    const keys = this.playerControls[this.playerIndex];
    if (gamepad) {
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
}
