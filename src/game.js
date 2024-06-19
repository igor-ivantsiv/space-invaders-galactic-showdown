// game class
class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.width = 600;
    this.height = 600;
    this.score = 0;

    this.alienArmy;
    this.superman;
    this.blasterSpeed = 4;
    this.lazerSpeed = 5;

    this.currentFrame = 0;
    this.lives = 1;
    this.gameOver = false;
  }

  start() {
    document.querySelectorAll("shot").forEach((shot) => {
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
        let body = document.querySelector("body");
        let bodyRect = body.getBoundingClientRect();
        let bodyWidth = Math.round(bodyRect.width);
        let marginCorrection = (bodyWidth - this.width) / 2;
        let invaderPosition = targetInvader.getBoundingClientRect();
        const shot = document.createElement("div");
        shot.style.backgroundColor = "green";
        shot.style.position = "absolute";
        shot.style.width = "5px";
        shot.style.height = "10px";
        shot.style.left = `${invaderPosition.left - marginCorrection}px`;
        shot.style.top = `${invaderPosition.top + invaderPosition.height}px`;
        shot.className = "shot";
        shot.setAttribute("id", `${this.currentFrame}`);
        this.gameScreen.appendChild(shot);
        this.playSoundEffect("blaster");
        this.blasterHandling(`${this.currentFrame}`);
      } else if (this.gameOver) {
        clearInterval(intervalId);
      } else {
        clearInterval(intervalId);
        this.generateBlasters();
      }
    }, 1000);
  }

  blasterHandling(blasterSelector) {
    const gameHeight = 600;
    let blaster = document.getElementById(blasterSelector);

    const intervalId = setInterval(() => {
      let blasterPosition = blaster.getBoundingClientRect().top;

      blaster.style.top = `${blasterPosition + this.blasterSpeed}px`;

      if (this.gameOver) {
        clearInterval(intervalId);
        blaster.remove();
      } else if (blasterPosition > gameHeight) {
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
          this.playSoundEffect("playerHit");
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
      this.endScreen.style.display = "flex";
      this.gameOver = "true";
      this.clearGame();
    }
  }

  clearGame() {
    document.querySelector(".player").remove();
    document.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
    document.querySelectorAll(".invader").forEach((invader) => {
      invader.remove();
    });
    document.querySelectorAll("shot").forEach((shot) => {
      shot.remove();
    });
  }

  moveArmy() {
    const intervalId = setInterval(() => {
      if (this.gameOver) {
        clearInterval(intervalId);
        this.alienArmy.army.style.left = "0px";
      } else if (this.alienArmy.directionX === 1) {
        if (
          this.alienArmy.left ===
          this.alienArmy.gameScreen.clientWidth -
            this.alienArmy.army.clientWidth
        ) {
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

  generateLazer() {
    if (!this.gameOver){
        const intervalId = setInterval(() => {
            let body = document.querySelector("body");
            let bodyRect = body.getBoundingClientRect();
            let bodyWidth = Math.round(bodyRect.width);
            let marginCorrection = (bodyWidth - this.width) / 2;
            const supermanPosition = this.superman.element.getBoundingClientRect();
            const lazer = document.createElement("div");
            lazer.style.backgroundColor = "red";
            lazer.style.position = "absolute";
            lazer.style.width = "6px";
            lazer.style.height = "10px";
            lazer.style.left = `${
              supermanPosition.left + this.superman.width / 2 - 3 - marginCorrection
            }px`;
            lazer.style.top = `${supermanPosition.top - 10}px`;
            lazer.className = "lazer";
            lazer.setAttribute("id", `lazer${this.currentFrame}`);
            this.gameScreen.appendChild(lazer);
            this.playSoundEffect("laser");
            this.lazerHandling(`lazer${this.currentFrame}`);
            clearInterval(intervalId);
          }, 1000 / 3);
    }
 else false;
  }

  lazerHandling(lazerSelector) {
    let lazer = document.getElementById(lazerSelector);

    const intervalId = setInterval(() => {
      let lazerRect = lazer.getBoundingClientRect();
      let lazerPosition = lazerRect.top;

      lazer.style.top = `${lazerPosition - this.lazerSpeed}px`;

      if (this.gameOver) {
        clearInterval(intervalId);
        lazer.remove();
      } else if (lazerPosition < 10) {
        clearInterval(intervalId);
        lazer.remove();
      } else if (lazerPosition > 10) {
        const allInvaders = document.querySelectorAll(".invader");
        allInvaders.forEach((invader) => {
          const invaderRect = invader.getBoundingClientRect();
          if (
            invaderRect.left < lazerRect.right &&
            invaderRect.right > lazerRect.left &&
            invaderRect.top < lazerRect.bottom &&
            invaderRect.bottom > lazerRect.top
          ) {
            this.playSoundEffect("alienHit");
            invader.remove();
            lazer.remove();
            this.checkArmy();
          } else {
            return false;
          }
        });
      }
    }, 1000 / 60);
  }

  checkArmy() {
    const allInvaders = document.querySelectorAll(".invader");
    if (allInvaders.length === 0) {
      this.gameScreen.style.display = "none";
      this.endScreen.style.display = "flex";
      this.gameOver = "true";
      this.clearGame();
      document.querySelector("h2").innerText = "You did it!";
      document.querySelector(".end-text").innerText =
        "You successfully detered the enemy force and saved mankind! To do this again press the restart button!";
    }
  }
  playSoundEffect(trigger) {
    if (trigger === "blaster") {
      const blasterSound = new Audio("audio/blaster.mp3");
      blasterSound.volume = 0.7;
      blasterSound.loop = false;
      blasterSound.playbackRate = 2.0;
      blasterSound.play();
    } else if (trigger === "laser") {
      const laserSound = new Audio("audio/laser.mp3"); 
      laserSound.volume = 0.3;
      laserSound.loop = false;
      laserSound.playbackRate = 2.0;
      laserSound.play();
    } else if (trigger === "playerHit") {
      const playerHitSound = new Audio("audio/player-hit.mp3");
      playerHitSound.volume = 0.2;
      playerHitSound.loop = false;
      playerHitSound.playbackRate = 1.0;
      playerHitSound.play();
    } else if (trigger === "alienHit") {
      const alienHitSound = new Audio("audio/alien-hit.mp3");
      alienHitSound.volume = 0.7;
      alienHitSound.loop = false;
      alienHitSound.playbackRate = 2.0;
      alienHitSound.play();
    }
  }
}
