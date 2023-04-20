export function checkObjectCollision(gameObject1, gameObject2) {
  if (
    gameObject2.x > gameObject1.width + gameObject1.x ||
    gameObject1.x > gameObject2.width + gameObject2.x ||
    gameObject2.y > gameObject1.height + gameObject1.y ||
    gameObject1.y > gameObject2.height + gameObject2.y
  ) {
    return false;
  }
  return true;
}
