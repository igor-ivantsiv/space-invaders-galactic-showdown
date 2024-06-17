// game class
class Game{
    constructor() {
        this.startScreen = document.querySelector('#game-intro')
        this.gameScreen = document.querySelector('#game-screen')
        this.endScreen = document.querySelector('#game-end')
        this.width = 600;
        this.height = 600;
        this.score = 0;

        this.alienArmy;
        this.superman;

        this.currentFrame = 0;
        this.lives = 1;
        this.gameOver = false;
    }

    start() {
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`
    
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.endScreen.style.display = 'none'   

        this.superman = new Superman(this.gameScreen)
        this.alienArmy = new AlienArmy();
        this.alienArmy.createArmy(1);
    }
} 