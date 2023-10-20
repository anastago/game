const gameBoard = document.querySelector(".game-board")

class Obstacle {
  constructor(imgSrc, left, top) {
    this.element = document.createElement("img")
    this.element.src = imgSrc
    this.left = left
    this.top = top
    this.element.style.width = "40px"
    this.element.style.height = "40px"
    this.element.style.position = "absolute"

    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
    gameBoard.appendChild(this.element)
  }

  moveRight() {
    let currentLeft = parseInt(this.element.style.left)
    currentLeft += 40 // to adjust the movement speed

    const gameBoardWidth = gameBoard.offsetWidth
    const obstacleWidth = this.element.offsetWidth
    const rightBoundary = gameBoardWidth - obstacleWidth

    if (currentLeft > rightBoundary) {
      currentLeft = 0
    }
    this.element.style.left = currentLeft + "px"
  }

  moveLeft() {
    let currentLeft = parseInt(this.element.style.left)
    currentLeft -= 40 // to adjust the movement speed

    const leftBoundary = 0

    if (currentLeft < leftBoundary) {
      currentLeft = gameBoard.offsetWidth - this.element.offsetWidth
    }
    this.element.style.left = currentLeft + "px"
  }
}

const bus1 = new Obstacle("./img/bus-decker-double-svgrepo-com.svg", 0, 480)
const bus2 = new Obstacle("./img/bus-transportation-svgrepo-com.svg", 120, 440)
const bike = new Obstacle("./img/bike-svgrepo-com.svg", 80, 520)
const taxi = new Obstacle("./img/taxi-svgrepo-com.svg", 1200, 400)

setInterval(() => {
  bus1.moveRight()
  bus2.moveRight()
  bike.moveRight()
  taxi.moveLeft()
}, 200)
