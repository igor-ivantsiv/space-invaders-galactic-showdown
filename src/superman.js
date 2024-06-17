class superman {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.width = 40;
      this.height = 80;
      this.top = this.gameScreen.clientHeight - this.height - 40;
      this.left = (this.gameScreen.clientWidth - this.width) / 2;
      this.element = document.createElement("img");
      this.speed = 3;
      this.directionX = 0;
  
      this.element.src = "";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    move() {
      this.left += this.directionX * this.speed;
      /*
      // Left side
      if (this.left < GRASS_WIDTH) {
        this.left = GRASS_WIDTH
      }
      // Right side
      if (this.left > this.gameScreen.clientWidth - this.width - GRASS_WIDTH) {
        this.left = this.gameScreen.clientWidth - this.width - GRASS_WIDTH
      } 
        */
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
    }
  
    gotHit(blaster) {
      const supermanRect = this.element.getBoundingClientRect();
      const blasterRect = lazer.element.getBoundingClientRect();
  
      if (
        supermanRect.left < blasterRect.right &&
        supermanRect.right > blasterRect.left &&
        supermanRect.top < blasterRect.bottom &&
        supermanRect.bottom > blasterRect.top
      ) {
        console.log("You took a hit!");
  
        return true;
      } else {
        return false;
      }
    }
  }
  