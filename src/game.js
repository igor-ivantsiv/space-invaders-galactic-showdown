// game class
class Game{
    constructor() {
        this.startScreen = document.querySelector('#game-intro')
        this.gameScreen = document.querySelector('#game-screen')
        this.endScreen = document.querySelector('#game-end')
        this.width = 800;
        this.height = 600;

        this.superman;
        this.alienArmy = [];

        this.currentFrame = 0;
    }

    start() {
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`
    
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.endScreen.style.display = 'none'   

        this.player = new Player(this.gameScreen)
        this.aliens.push(new Aliens(this.gameScreen))
    }
} 