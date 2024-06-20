class AlienArmy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 30;
    this.height = 30;
    this.speed = 1;
    this.directionX = 1;
    this.top = 10;
    this.left = 0;

    this.army = document.getElementById("alien-army");
    this.army.position = "absolute";
    this.army.style.top = `${this.top}px`;
    this.army.style.left = `${this.left}px`;
  }
    // Army generation with static number of rows and columns
  createArmy(level) {
    if (level === 1) {
      for (let i = 0; i < 8; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 13; j++) {
          const cell = document.createElement("td");
          cell.style.width = `${this.width}px`;
          cell.style.height = `${this.height}px`;
          const img = document.createElement("img");
          img.src = "images/alien.png";
          img.style.width = `${this.width - 10}px`;
          img.style.height = `${this.height - 10}px`;
          img.className = "invader";
          img.setAttribute("id", `${i}-${j}`); // Each invader gets an ID based on row and column, so that each alien could be randomly selected to fire projectiles
          cell.appendChild(img);
          row.appendChild(cell);
        }
        this.army.appendChild(row);
      }
    }
  }
}
