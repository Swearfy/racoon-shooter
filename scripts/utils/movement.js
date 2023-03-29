export function playerMovement(player, keys) {
  let playerSpeed = 2;

  if (
    (keys.up.pressed || keys.down.pressed) &&
    (keys.left.pressed || keys.right.pressed)
  ) {
    playerSpeed = playerSpeed * 0.71;
  }

  let x = keys.left.pressed
    ? -playerSpeed
    : keys.right.pressed
    ? playerSpeed
    : 0;
  let y = keys.up.pressed ? -playerSpeed : keys.down.pressed ? playerSpeed : 0;

  player.move(x, y);
}
