// game class
class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.width = 600;
    this.height = 600;
    this.score = 0;

    this.gameId;
    this.alienArmy;
    this.superman;
    this.blasterSpeed = 4;

    this.currentFrame = 0;
    this.lives = 1;
    this.gameOver = false;
  }

  start() {
    document.querySelectorAll('shot').forEach(shot => {
        shot.remove();
      });
      this.gameScreen.style.width = `${this.width}px`;
      this.gameScreen.style.height = `${this.height}px`;

      this.startScreen.style.display = "none";
      this.gameScreen.style.display = "block";
      this.endScreen.style.display = "none";

      this.superman = new Superman(this.gameScreen);
      this.alienArmy = new AlienArmy(this.gameScreen);
      this.alienArmy.createArmy(1);
      this.moveArmy();
      this.generateBlasters();

      const intervalId = setInterval(() => {
        this.currentFrame += 1;
        this.superman.move();
      }, 1000 / 60);
  }
  generateBlasters() {
    const intervalId = setInterval(() => {
      let randomRow = Math.floor(Math.random() * 8);
      let randomColumn = Math.floor(Math.random() * 13);

      let targetInvader = document.getElementById(
        `${randomRow}-${randomColumn}`
      );

      if (targetInvader) {
        let invaderPosition = targetInvader.getBoundingClientRect();
        const shot = document.createElement("div");
        shot.style.backgroundColor = "green";
        shot.style.position = "absolute";
        shot.style.width = "5px";
        shot.style.height = "10px";
        shot.style.left = `${invaderPosition.left}px`;
        shot.style.top = `${invaderPosition.top + invaderPosition.height}px`;
        shot.className = 'shot';
        shot.setAttribute("id", `${this.currentFrame}`);
        this.gameScreen.appendChild(shot);
        this.blasterHandling(`${this.currentFrame}`);
      } 
      else if (this.gameOver) {
        clearInterval(intervalId);
      }
      else {
        clearInterval(intervalId);
        this.blasters();
      }
    }, 1000);
  }

  blasterHandling(blasterSelector) {
    const gameHeight = 600;
    let blaster = document.getElementById(blasterSelector);

    const intervalId = setInterval(() => {
      let blasterPosition = blaster.getBoundingClientRect().top;

      blaster.style.top = `${blasterPosition + this.blasterSpeed}px`;

      if (this.gameOver){
        clearInterval(intervalId);
        blaster.remove();
      }
      else if (blasterPosition > gameHeight) {
        clearInterval(intervalId);
        blaster.remove();
      } else if (blasterPosition < gameHeight) {
        const supermanRect = this.superman.element.getBoundingClientRect();
        const blasterRect = blaster.getBoundingClientRect();
        if (
          supermanRect.left < blasterRect.right &&
          supermanRect.right > blasterRect.left &&
          supermanRect.top < blasterRect.bottom &&
          supermanRect.bottom > blasterRect.top
        ) {
          blaster.remove();
          console.log("You got blasted!");
          this.lives -= 1;
          this.checkLives();
        } else {
          return false;
        }
      }
    }, 1000 / 60);
  }
  checkLives() {
    if (this.lives === 0) {
      this.gameScreen.style.display = "none";
      this.endScreen.style.display = "block";
      this.gameOver = "true";
      this.clearGame();
    }
  }
  clearGame(){
    document.querySelector('.player').remove();
    document.querySelectorAll('tr').forEach(tr => {
      tr.remove();
    });
    document.querySelectorAll('.invader').forEach(invader => {
      invader.remove();
    });
    document.querySelectorAll('shot').forEach(shot => {
      shot.remove();
    });
    
  }
  moveArmy() {
    const intervalId = setInterval(() => {
        if (this.gameOver){
            clearInterval(intervalId);
            this.alienArmy.army.style.left = '0px';
        }
      else if (this.alienArmy.directionX === 1) {
        if (this.alienArmy.left === this.alienArmy.gameScreen.clientWidth - this.alienArmy.army.clientWidth) {
          this.alienArmy.directionX = -1;
        } else {
          this.alienArmy.left += this.alienArmy.speed;
          this.alienArmy.army.style.left = `${this.alienArmy.left}px`;
        }
      } else if (this.alienArmy.directionX === -1) {
        if (this.alienArmy.left === 0) {
          this.alienArmy.directionX = 1;
        } else {
          this.alienArmy.left -= this.alienArmy.speed;
          this.alienArmy.army.style.left = `${this.alienArmy.left}px`;
        }
      }
    }, 1000 / 60);
  }
}
