# Space Invaders: Galactic Showdown
[Click here to try out the game!](https://igor-ivantsiv.github.io/space-invaders-galactic-showdown/)


## Description
Space Invaders: Galactic Showdown is a game where you play as a starfighter defending against an alien invasion. The goal of the game is to take out all of the aliens without being hit yourself.


## MVP
1. Intro screen with instructions and a button to start the game
2. Single level game with logic for winning or losing:
    - Starfighter moves and changes direction by using the `left` and `right`buttons.
    - Starfighter can shoot lasers at the alien invasion by pressing the `space` button.
    - An alien army which is moving around from side to side and random aliens from the army shooting blasters at the player.
    - The game ends when either the player is hit by a blaster, or if all aliens have been taken out.
3. Game completed/over screen with a button to restart the game

## Backlog
- More levels including a boss fight
- Different aliens with different behaviour
- Life system
- Power up/down system
- Local multiplayer

## Data structure
### script.js
- initGame()
- startGame()

### game.js - Game Class
- start()
- playSoundEffect(trigger) 
- moveArmy()
- generateBlasters()
- blasterHandling(blasterSelector)
- generateLazer()
- lazerHandling(lazerSelector)
- checkArmy()
- checkLives()
- clearGame()

### player.js - Player Class
- move()

### alien-army.js - AlienArmy Class
- createArmy(level)

## States & States Transitions
1. Intro screen
    - Transitions to game screen upon the user clicking the "Start Game" button
2. Game screen
    - Transitions to the game end screen upon either the player being hit, or the entirety of the alien army being eliminated
3. End screen
    - Transitions back to the game screen upon the user clicking the "Restart Game" button


## Task
1. Set up HTML file: Single page with three sections and elements pretaining to each screen
2. Set up basic CSS to hide the game and end screens
3. Set up event listeners for start & restart buttons to start the game
4. Set up game, player and alien army classes
5. Set up a function to start the game and switch to the game screen
6. Add player creation to the start() function
7. Add event listeners to the movement keys and set up player move() function
8. Set up createArmy() function to create an enemy alien army upon game start
9. Set up moveArmy() function to move the alien army from side to side
10. Add event listener to the space button and set up generateLazer() function to create player projectiles
11. Set up generateBlasters() function to randomly generate alien projectiles
12. Set up lazerHandling(lazerSelector) function to add movement & collision logic to player projectiles
13. Set up blasterHandling(blasterSelector) function to add movement & collision logic to alien projectiles
14. Set up checkArmy() function to check if alien army was eliminated and logic to move to the success end game screen
15. Set up checkLives() function to check how many lives are left upon the player taking a hit and logic to move to the game over end game screen
16. Setting up game reset functionality to remove all previously generated elements and clearing all intervals by setting up the clearGame() function and adding reset functionality to the other functions
17. Add CSS to intro & end game screens
18. Add background music upon game being loaded
19. Add prompt upon loading of the page to get first user interaction to start background music
20. Add laser, blaster, player hit and alien hit SFX

## Links

- [Slides Link](https://docs.google.com/presentation/d/1VcDNVTsk23udinOXRMdhX5oBqPDA1IscyFMAULwbidA/edit?usp=sharing)
- [Github repository Link](https://github.com/igor-ivantsiv/space-invaders-galactic-showdown)
- [Deployment Link](https://github.com/igor-ivantsiv/space-invaders-galactic-showdown/actions/runs/9595753013)