import { Game } from "./scripts/game.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lives = document.getElementById("lives");
const powerUps = document.getElementById("powerUps");

canvas.width = 900;
canvas.height = 900;
let previouseTime = null;
const gameSpeed = 0.2;

async function promise() {
  const response = await fetch("./assets/gameObjects.json");
  const enemyType = await response.json();

  return enemyType;
}

promise().then((assets) => {
  const game = new Game(assets, canvas.width, canvas.height);
  game.init();

  requestAnimationFrame(animate);

  function animate(currentTime) {
    const frameTimeDelta = currentTime - previouseTime;
    previouseTime = currentTime;
    game.fps = gameSpeed * frameTimeDelta;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
});
