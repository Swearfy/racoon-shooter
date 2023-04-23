import { Game } from "./scripts/game.js";

/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

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
  const gameObject = await response.json();
  const level1 = await level1Data.json();
  const level2 = await level2Data.json();
  const level3 = await level3Data.json();

  return { gameObject, gameLevels: { 1: level1, 2: level2, 3: level3 } };
}

// start menu
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startMenu").style.display = "none";
  document.getElementById("playerSelector").style.display = "flex";
});

promise().then((assets) => {
  const game = new Game(assets, canvas.width, canvas.height);

  // single play lunch
  document.getElementById("singlePlayer").addEventListener("click", () => {
    document.getElementById("playerSelector").style.display = "none";
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("game").style.display = "block";
    game.init();
    requestAnimationFrame(animate);
  });

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
