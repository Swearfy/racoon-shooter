import { Game } from "./scripts/game.js";

async function promise() {
  const level1Data = await fetch("./assets/levels/level1.json");
  const level2Data = await fetch("./assets/levels/level2.json");
  const level3Data = await fetch("./assets/levels/level3.json");
  const level4Data = await fetch("./assets/levels/level4.json");
  const level5Data = await fetch("./assets/levels/level5.json");
  const level6Data = await fetch("./assets/levels/level6.json");

  const response = await fetch("./assets/gameObjects.json");
  const gameObject = await response.json();

  const level1 = await level1Data.json();
  const level2 = await level2Data.json();
  const level3 = await level3Data.json();
  const level4 = await level4Data.json();
  const level5 = await level5Data.json();
  const level6 = await level6Data.json();

  return {
    gameObject,
    gameLevels: {
      1: level1,
      2: level2,
      3: level3,
      4: level4,
      5: level5,
      6: level6,
    },
  };
}

const story = new Audio("./assets/audio/story.wav");
// const introSong = new Audio(
//   "./assets/audio/backgroundMusic/Juhani-Junkala-[Retro-Game-Music-Pack]-Title-Screen.wav"
// );
// introSong.loop = true;

// const stage1Song = new Audio(
//   "./assets/audio/backgroundMusic/Juhani-Junkala-[Retro-Game-Music-Pack]-Level-1.wav"
// );

promise().then((assets) => {
  // start menu
  document.getElementById("startButton").addEventListener("click", () => {
    story.pause();

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

  let previousTime;
  const step = 1 / 60;

  let game;
  if (gameMode === "single") {
    game = new Game(assets, canvas.width, canvas.height, 1);
  } else if (gameMode === "duo") {
    game = new Game(assets, canvas.width, canvas.height, 2);
  }

  function animate(currentTime) {
    if (previousTime === undefined) {
      previousTime = currentTime;
    }

    let deltaTime = (currentTime - previousTime) / 1000;
    while (deltaTime >= step) {
      game.update();
      game.dt = deltaTime;
      deltaTime -= step;
    }
    previousTime = currentTime - deltaTime * 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

document.getElementById("leaderBoard-button").addEventListener("click", () => {
  document.getElementById("startMenu").style.display = "none";
  document.getElementById("leaderBoard").style.display = "flex";
  loadRuns();
});

// go back button
document
  .getElementById("leaderBoard-back-btn")
  .addEventListener("click", () => {
    document.getElementById("startMenu").style.display = "flex";
    document.getElementById("leaderBoard").style.display = "none";
  });

document.getElementById("storyButton").addEventListener("click", () => {
  story.play();
});

const container = document.getElementById("scoresContainers");
function loadRuns() {
  let storedScore = JSON.parse(localStorage.getItem("score"));

  container.innerHTML = "";

  if (storedScore) {
    storedScore.forEach((elem) => {
      createContainer(elem.runName, elem.outcome, elem.score, elem.level);
    });
  }
}

function createContainer(name, outcome, score, level) {
  const scoreClass = document.createElement("div");
  scoreClass.classList.add("score");

  const nameContainer = document.createElement("div");
  const nameText = document.createElement("span");
  nameText.innerText = name;
  nameContainer.append(nameText);

  const outcomeContainer = document.createElement("div");
  const outcomeText = document.createElement("span");
  outcomeText.innerText = outcome;
  outcomeContainer.append(outcomeText);

  const scoreContainer = document.createElement("div");
  const scoreText = document.createElement("span");
  scoreText.innerText = score;
  scoreContainer.append(scoreText);

  const levelContainer = document.createElement("div");
  const levelText = document.createElement("span");
  levelText.innerText = level;
  levelContainer.append(levelText);

  scoreClass.append(nameContainer);
  scoreClass.append(outcomeContainer);
  scoreClass.append(scoreContainer);
  scoreClass.append(levelContainer);

  container.append(scoreClass);
}
