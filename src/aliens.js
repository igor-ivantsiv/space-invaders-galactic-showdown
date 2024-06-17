class alienArmy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 520;
    this.height = 280;
    this.speed = 1;
    this.top = 40;
    this.left = (this.gameScreen.clientWidth - this.width) / 2;

    // randomizing the direction of army movement
    if (Math.random() - 0.5 > 0) {
      this.directionX = 1;
    } else {
      this.directionX = -1;
    }

    this.element = document.create("div");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);
  }

  createArmy() {

  }

  moveArmy() { // can be refactored later to if this.left === 0 or === 280..
    if ((this.directionX = 1)) {
      if (this.left === this.gameScreen.clientWidth - this.width) {
        this.directionX *= -1;
      } else {
        this.left += this.speed;
        this.element.style.top = `${this.top}px`;
      }
    } else if ((this.directionX = -1)) {
      if (this.left === 0) {
        this.directionX *= -1;
      } else {
        this.left -= this.speed;
        this.element.style.top = `${this.top}px`;
      }
    }
  }
}
