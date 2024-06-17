class AlienArmy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 30;
    this.height = 30;
    this.speed = 1;

    // randomizing the direction of army movement
    if (Math.random() - 0.5 > 0) {
      this.directionX = 1;
    } else {
      this.directionX = -1;
    }
  }

  createArmy(level) {
    const army = document.getElementById("alien-army");
    if (level === 1) {
      for (let i = 0; i < 8; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j <13; j++){
          const cell = document.createElement('td');
          cell.style.width = `${this.width}px`;
          cell.style.height = `${this.height}px`;
          const img = document.createElement('img')
          img.src = '../images/alien.png';
          img.style.width = `${this.width -10}px`;
          img.style.height = `${this.height -10}px`;
          img.className = "invader"
          cell.appendChild(img);
          row.appendChild(cell);
        }
        army.appendChild(row);
      }
    }
  }

  moveArmy() {
    // need to add interval
    // can be refactored later to if this.left === 0 or === 280..
    if ((this.directionX = 1)) {
      if (this.left === this.gameScreen.clientWidth - this.width) {
        this.directionX = -1;
      } else {
        this.left += this.speed;
        this.element.style.top = `${this.top}px`;
      }
    } else if ((this.directionX = -1)) {
      if (this.left === 0) {
        this.directionX = 1;
      } else {
        this.left -= this.speed;
        this.element.style.top = `${this.top}px`;
      }
    }
  }
}
