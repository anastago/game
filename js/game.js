const timeLeftcounter = document.querySelector("#time-left")
let timeLeft = 30
const livesCounter = document.querySelector("#lives")

class Game {
  constructor(obstacles) {
    this.startScreen = document.getElementById("game-intro")
    this.gameScreen = document.getElementById("game-screen")
    this.gameEndScreen = document.getElementById("game-end")
    this.winScreen = document.getElementById("game-win")
    this.player = new Player()
    this.obstacles = obstacles
    this.score = 0
    this.lives = 3
    this.gameIsOver = false
  }

  start() {
    this.startScreen.style.display = "none"
    this.gameScreen.style.display = "block"
    this.updateTimeLeft()
    this.gameLoop()
  }

  gameLoop() {
    if (this.gameIsOver) {
      return
    }

    this.update()

    window.requestAnimationFrame(() => this.gameLoop())
  }
  update() {
    for (const obstacle of this.obstacles) {
      if (this.player.didCollide(obstacle)) {
        this.lives--
        livesCounter.textContent = this.lives
        if (this.lives <= 0) {
          this.endGame()
        } else {
          this.player.reset()
          clearInterval(this.timerInterval)
          timeLeft = 30
          timeLeftcounter.textContent = timeLeft
          livesCounter.textContent = this.lives
        }
        return
      }

      if (this.player.currentIndex >= 44 && this.player.currentIndex <= 48) {
        this.gameIsOver = true
        this.gameScreen.style.display = "none"
        this.winScreen.style.display = "block"
        return
      }
    }
  }

  updateTimeLeft() {
    timeLeftcounter.textContent = timeLeft
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--
        timeLeftcounter.textContent = timeLeft
      } else {
        this.endGame()
        clearInterval(timerInterval)
      }
    }, 1000)
  }

  endGame() {
    this.player.element.remove()
    this.obstacles.forEach(function (obstacle) {
      obstacle.element.remove()
    })

    this.gameIsOver = true
    this.gameScreen.style.display = "none"
    this.gameEndScreen.style.display = "block"
  }
}
