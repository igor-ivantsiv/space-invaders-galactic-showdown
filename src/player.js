class Player {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.width = 40;
      this.height = 40;
      this.top = this.gameScreen.clientHeight - this.height - 20;
      this.left = (this.gameScreen.clientWidth - this.width) / 2;
      this.element = document.createElement("img");
      this.speed = 4;
      this.directionX = 0;
  
      this.element.src = "images/player.png";
      this.element.style.position = "absolute";
      this.element.className = 'player';
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
  
      this.gameScreen.appendChild(this.element);
    }
      // Player movement & boundaries
    move() {
      this.left += this.directionX * this.speed;
  
      if (this.left < 1) {
        this.left = 0
      }
      if (this.left > this.gameScreen.clientWidth - this.width) {
        this.left = this.gameScreen.clientWidth - this.width
      } 
     
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
    }
  }
  