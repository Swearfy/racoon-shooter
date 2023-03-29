function playerShooting(player, keys) {
  let bulletSpeed = 4;

  if (
    (keys.shootUp.pressed || keys.shootDown.pressed) &&
    (keys.shootLeft.pressed || keys.shootRight.pressed)
  ) {
    bulletSpeed = bulletSpeed * 0.71;
  }

  let velX = keys.shootLeft.pressed
    ? -bulletSpeed
    : keys.shootRight.pressed
    ? bulletSpeed
    : 0;
  let velY = keys.shootUp.pressed
    ? -bulletSpeed
    : keys.shootDown.pressed
    ? bulletSpeed
    : 0;

  player.shoot(velX, velY);
}
