window.onload = function () {
    // Background music settings
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.volume = 0.1;
  bgMusic.loop = true;
    // Starting the game
  let game;

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

    // Event listeners for buttons, player movement & player shooting
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    console.log(`Start button clicked`);
    startGame();
  });

  restartButton.addEventListener("click", function () {
    startGame();
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyA" || event.code === "ArrowLeft") {
      // Move to the left
      game.player.directionX = -1;
    }
    if (event.code === "KeyD" || event.code === "ArrowRight") {
      // Move to the right
      game.player.directionX = 1;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (
      event.code === "KeyA" ||
      event.code === "ArrowLeft" ||
      event.code === "KeyD" ||
      event.code === "ArrowRight"
    ) {
      game.player.directionX = 0;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      game.generateLazer();
    }
  });
};
