window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  startButton.addEventListener("click", function () {
    console.log(`Start button clicked`);
    startGame();
  });

  restartButton.addEventListener("click", function () {
    startGame();
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      // Move to the left
      game.superman.directionX = -1
    }
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
      // Move to the right
      game.superman.directionX = 1
    }
  })

  document.addEventListener('keyup', event => {
    if (
      event.code === 'KeyA' ||
      event.code === 'ArrowLeft' ||
      event.code === 'KeyD' ||
      event.code === 'ArrowRight'
    ) {
      // Stop superman from moving
      game.superman.directionX = 0
    }
  })
  document.addEventListener('keydown', event => {
    if (event.code === 'Space'){
      game.generateLazer();
    }
  })

};
