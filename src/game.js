/*
Few FYIs:
- Most functions were moved to this file because the logic was dependent on the this.gameOver state, or on this.currentFrame.
- If the aim of this project would have been to create a multi-level game, I would have tried to work more with classes.
- Blaster variables refer to alien projectiles.
- Laser variables refer to player projectiles.
*/
class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.width = 600;
    this.height = 600;
    this.score = 0;

    this.alienArmy;
    this.player;
    this.blasterSpeed = 4; // can be used to increase difficulty by increasing alien projectile speed
    this.lazerSpeed = 5;

    this.currentFrame = 0;
    this.lives = 1;
    this.gameOver = false;
  }
    // Starting the game
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.endScreen.style.display = "none";

    this.player = new Player(this.gameScreen);
    this.alienArmy = new AlienArmy(this.gameScreen);
    this.alienArmy.createArmy(1); 
    this.moveArmy();
    this.generateBlasters();

    const intervalId = setInterval(() => {
      this.currentFrame += 1;
      this.player.move();
    }, 1000 / 60);
  }
    // Sound effects
    playSoundEffect(trigger) {
    if (trigger === "blaster") {
      const blasterSound = new Audio("audio/blaster.mp3");
      blasterSound.volume = 0.7;
      blasterSound.loop = false;
      blasterSound.playbackRate = 2.0;
      blasterSound.play();
    } else if (trigger === "laser") {
      const laserSound = new Audio("audio/laser.mp3"); 
      laserSound.volume = 0.1;
      laserSound.loop = false;
      laserSound.playbackRate = 2.0;
      laserSound.play();
    } else if (trigger === "playerHit") {
      const playerHitSound = new Audio("audio/player-hit.mp3");
      playerHitSound.volume = 0.1;
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
    // Army movement logic - moved to the game class because clearing the interval is based on the this.gameOver state
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
    // Generating alien projectiles from random alive aliens - moved to game class due to dependency on this.gameOver and this.currentFrame
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
        let invaderPosition = targetInvader.getBoundingClientRect();  // needed to use this method because the projectiles needed to be created outside of the table so that the projectiles do not move with the constant movement of the table, so absolute position couldn't have worked in this case
        const blaster = document.createElement("div");
        blaster.style.backgroundColor = "green";
        blaster.style.position = "absolute";
        blaster.style.width = "5px";
        blaster.style.height = "10px";
        blaster.style.left = `${invaderPosition.left - marginCorrection}px`;
        blaster.style.top = `${invaderPosition.top + invaderPosition.height}px`;
        blaster.className = "blaster";
        blaster.setAttribute("id", `${this.currentFrame}`); // this way evey projectile gets a unique id
        this.gameScreen.appendChild(blaster);
        this.playSoundEffect("blaster");
        this.blasterHandling(`${this.currentFrame}`); // passing the projectile id as an argument
      } else if (this.gameOver) {
        clearInterval(intervalId);
      } else {
        clearInterval(intervalId);
        this.generateBlasters();
      }
    }, 800); // can be used to increase difficulty by increasing alien fire rate
  }
    // Alien projectile movement, collision & clearing logic
  blasterHandling(blasterSelector) {
    let blaster = document.getElementById(blasterSelector);

    const intervalId = setInterval(() => {
      let blasterPosition = blaster.getBoundingClientRect().top;

      blaster.style.top = `${blasterPosition + this.blasterSpeed}px`;

      if (this.gameOver) {
        clearInterval(intervalId);
        blaster.remove();
      } else if (blasterPosition > this.height) {
        clearInterval(intervalId);
        blaster.remove();
      } else if (blasterPosition < this.height) {
        const playerRect = this.player.element.getBoundingClientRect();
        const blasterRect = blaster.getBoundingClientRect();
        if (
          playerRect.left < blasterRect.right &&
          playerRect.right > blasterRect.left &&
          playerRect.top < blasterRect.bottom &&
          playerRect.bottom > blasterRect.top
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
    // Generating player projectiles based on the player pressing the space button
  generateLazer() {
    if (!this.gameOver){
        const intervalId = setInterval(() => {
            let body = document.querySelector("body");
            let bodyRect = body.getBoundingClientRect();
            let bodyWidth = Math.round(bodyRect.width);
            let marginCorrection = (bodyWidth - this.width) / 2;
            const playerPosition = this.player.element.getBoundingClientRect();
            const lazer = document.createElement("div");
            lazer.style.backgroundColor = "red";
            lazer.style.position = "absolute";
            lazer.style.width = "6px";
            lazer.style.height = "10px";
            lazer.style.left = `${
              playerPosition.left + this.player.width / 2 - 3 - marginCorrection
            }px`; // -3 is for half the width of the projectile
            lazer.style.top = `${playerPosition.top - 10}px`;
            lazer.className = "lazer";
            lazer.setAttribute("id", `lazer${this.currentFrame}`); // using current frame as part of the id again
            this.gameScreen.appendChild(lazer);
            this.playSoundEffect("laser");
            this.lazerHandling(`lazer${this.currentFrame}`); // passing the id as an argument
            clearInterval(intervalId);
          }, 1000 / 3);
    }
 else false;
  }
    // Player projectile movement, collision & clearing logic
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
    // Checking if all aliens were killed to trigger the success end game screeen and triggering game reset function
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
    // Checking how player has no more lives to trigger the game over screen and triggering game reset function
  checkLives() {
    if (this.lives === 0) {
      this.gameScreen.style.display = "none";
      this.endScreen.style.display = "flex";
      this.gameOver = "true";
      this.clearGame();
    }
  }
    // Game reset function to clear all generated elements and intervals (if not already done within the original function)
  clearGame() {
    document.querySelector(".player").remove();
    document.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
    document.querySelectorAll(".invader").forEach((invader) => {
      invader.remove();
    });
    document.querySelectorAll("blaster").forEach((blaster) => {
      blaster.remove();
    });
  }
}
