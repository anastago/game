const cells = document.querySelectorAll(".cell")

class Player {
  constructor() {
    this.element = document.createElement("img")
    this.element.src = "./img/frog.png"
    this.element.classList.add("frog")
    this.gameBoard = document.querySelector(".game-board")
    this.gameBoard.appendChild(this.element)
    this.currentIndex = 449
    this.width = 31
    cells[this.currentIndex].appendChild(this.element)

    document.addEventListener("keyup", (event) => this.move(event))
  }
  move(event) {
    switch (event.key) {
      case "ArrowLeft":
        const excludedIndexesLeft = [
          65, 96, 127, 158, 189, 220, 74, 105, 136, 167, 198, 229, 84, 115, 146,
          177, 208, 239,
        ]
        if (
          this.currentIndex % this.width !== 0 &&
          !excludedIndexesLeft.includes(this.currentIndex)
        ) {
          this.currentIndex -= 1
        }
        break
      case "ArrowRight":
        const excludedIndexesRight = [
          70, 101, 132, 163, 194, 225, 80, 111, 142, 173, 204, 235, 89, 120,
          151, 182, 213, 244,
        ]
        if (
          this.currentIndex % this.width < this.width - 1 &&
          !excludedIndexesRight.includes(this.currentIndex)
        ) {
          this.currentIndex += 1
        }
        break
      case "ArrowUp":
        const excludedIndexesUp = [
          248, 249, 250, 257, 258, 259, 267, 268, 269, 276, 277, 278,
        ]
        if (
          this.currentIndex - this.width >= 0 &&
          !excludedIndexesUp.includes(this.currentIndex)
        ) {
          this.currentIndex -= this.width
        }
        break
      case "ArrowDown":
        const excludedIndexesDown = [
          31, 32, 33, 40, 41, 42, 50, 51, 52, 59, 60, 61,
        ]
        if (
          this.currentIndex + this.width < this.width * 15 &&
          !excludedIndexesDown.includes(this.currentIndex)
        ) {
          this.currentIndex += this.width
        }
        break
    }
    cells[this.currentIndex].appendChild(this.element)
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect()
    const obstacleRect = obstacle.element.getBoundingClientRect()

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true
    } else {
      return false
    }
  }

  reset() {
    this.currentIndex = 449
    cells[this.currentIndex].appendChild(this.element)
  }
}
