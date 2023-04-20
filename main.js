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
  const level1Data = await fetch("./assets/levels/level1.json");
  const level2Data = await fetch("./assets/levels/level2.json");
  const level3Data = await fetch("./assets/levels/level3.json");
  const response = await fetch("./assets/gameObjects.json");
  const gameObjectType = await response.json();
  const level1 = await level1Data.json();
  const level2 = await level2Data.json();
  const level3 = await level3Data.json();

  return { gameObjectType, level1, level2, level3 };
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
