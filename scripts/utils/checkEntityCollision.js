export function checkObjectCollision(gameObject1, gameObject2) {
  if (
    gameObject2.x > gameObject1.right ||
    gameObject1.x > gameObject2.right ||
    gameObject2.y > gameObject1.bottom ||
    gameObject1.y > gameObject2.bottom
  ) {
    return false;
  }
  return true;
}
