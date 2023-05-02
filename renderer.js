import { Game } from "./scripts/game.js";

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

promise().then((assets) => {
  // start menu
  document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startMenu").style.display = "none";
    document.getElementById("playerSelector").style.display = "flex";
  });

  // go back button
  document.getElementById("backButton").addEventListener("click", () => {
    document.getElementById("startMenu").style.display = "flex";
    document.getElementById("playerSelector").style.display = "none";
  });

  document.getElementById("mainMenuButton").addEventListener("click", () => {
    document.getElementById("startMenu").style.display = "flex";
    document.getElementById("gameMenu").style.display = "flex";
    document.getElementById("GameOverScreen").style.display = "none";
  });

  let gameMode = "single";
  // single play lunch
  document.getElementById("singlePlayer").addEventListener("click", () => {
    gameMode = "single";
    startGame(assets, gameMode);
  });

  document.getElementById("duoPlay").addEventListener("click", () => {
    gameMode = "duo";
    startGame(assets, gameMode);
  });

  document.getElementById("restartGame").addEventListener("click", () => {
    startGame(assets, gameMode);
  });
});

function startGame(assets, gameMode) {
  turnOffMenu();

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const powerUps = document.getElementById("powerUps");

  canvas.width = 900;
  canvas.height = 900;

  let previousTime = null;
  const gameSpeed = 0.2;

  let game;
  if (gameMode === "single") {
    game = new Game(assets, canvas.width, canvas.height, 1);
  } else if (gameMode === "duo") {
    game = new Game(assets, canvas.width, canvas.height, 2);
  }

  function animate(currentTime) {
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    game.fps = gameSpeed * frameTimeDelta;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update();
    game.draw(ctx);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function turnOffMenu() {
  document.getElementById("playerSelector").style.display = "none";
  document.getElementById("gameMenu").style.display = "none";
  document.getElementById("game").style.display = "block";
}
