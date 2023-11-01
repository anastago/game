const gameBoard = document.querySelector(".game-board")

class Obstacle {
  constructor(imgSrc, left, top, width) {
    this.element = document.createElement("img")
    this.element.src = imgSrc
    this.left = left
    this.top = top
    this.element.style.width = `${width}px`
    this.element.style.height = "40px"
    this.element.style.position = "absolute"
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
    gameBoard.appendChild(this.element)
  }

  move(direction, minX, maxX) {
    let currentLeft = parseInt(this.element.style.left)
    if (direction === "right") {
      currentLeft += 10
      if (currentLeft > maxX) {
        currentLeft = minX
      }
    } else if (direction === "left") {
      currentLeft -= 10
      if (currentLeft < minX) {
        currentLeft = maxX
      }
    }
    this.element.style.left = currentLeft + "px"
  }

  moveBridge(direction, minX, maxX) {
    let currentLeft = parseInt(this.element.style.left)
    if (direction === "right") {
      currentLeft += 10
      if (currentLeft > maxX) {
        currentLeft = minX
      }
    } else if (direction === "left") {
      currentLeft -= 10
      if (currentLeft < minX) {
        currentLeft = maxX
      }
    }
    this.element.style.left = currentLeft + "px"
  }
}

function createObstacle(imgSrc, left, top, width, direction, minX, maxX) {
  const obstacle = new Obstacle(imgSrc, left, top, width)

  setInterval(() => {
    obstacle.move(direction, minX, maxX)
  }, 150 + Math.random() * 150)

  return obstacle
}

const obstaclesLev1 = []
const gameBoardWidth = 1242

function createObstacles(
  numObstacles,
  positions,
  imgPath,
  direction,
  minX,
  maxX
) {
  for (let i = 0; i < numObstacles; i++) {
    const randomYPositionIndex = Math.floor(Math.random() * positions.length)
    const randomStart = Math.floor(Math.random() * gameBoardWidth)
    const obstacle = createObstacle(
      `${imgPath}${Math.floor(Math.random() * 12 + 1)}.svg`,
      randomStart,
      positions[randomYPositionIndex],
      40,
      direction,
      minX,
      maxX
    )

    if (direction === "left") {
      obstacle.element.style.transform = "scaleX(-1)"
    }

    obstaclesLev1.push(obstacle)
  }
}

// road right
const yPositionsRight = [520, 440, 480]
createObstacles(
  20,
  yPositionsRight,
  "./img/roadRight/Car",
  "right",
  0,
  gameBoardWidth - 40
)

//road left
const yPositionsLeft = [360, 400]
createObstacles(
  15,
  yPositionsLeft,
  "./img/roadRight/Car",
  "left",
  0,
  gameBoardWidth - 40
) // Bridges
function createObstacleOnBridge(numObstacles, positionsRightLeft, minX, maxX) {
  const [yPositionsBridgeRight, yPositionsBridgeLeft] = positionsRightLeft
  for (let i = 0; i < numObstacles; i++) {
    const randomYPositionIndexRight = Math.floor(
      Math.random() * yPositionsBridgeRight.length
    )
    const randomYPositionIndexLeft = Math.floor(
      Math.random() * yPositionsBridgeLeft.length
    )
    const personRight = new Obstacle(
      `./img/People/personR${Math.floor(Math.random() * 6 + 1)}.png`,
      minX[Math.floor(Math.random() * minX.length)],
      yPositionsBridgeRight[randomYPositionIndexRight],
      40
    )
    const personLeft = new Obstacle(
      `./img/People/personL${Math.floor(Math.random() * 6 + 1)}.png`,
      maxX[Math.floor(Math.random() * maxX.length)],
      yPositionsBridgeLeft[randomYPositionIndexLeft],
      40
    )
    ;(function (person) {
      setInterval(() => {
        person.move("right", Math.min(...minX), Math.max(...maxX))
      }, Math.floor(700 + Math.random() * 301))
    })(personRight)
    ;(function (person) {
      setInterval(() => {
        person.move("left", Math.min(...minX), Math.max(...maxX))
      }, Math.floor(700 + Math.random() * 301))
    })(personLeft)
    obstaclesLev1.push(personLeft, personRight)
  }
}

const bridgeYPositions = [
  [280, 200, 120],
  [80, 160, 240],
]

const bridge1StartPositions = [120, 240, 200, 160, 320]
const bridge2StartPositions = [480, 600, 720]
const bridge3StartPositions = [880, 1000, 1080]

createObstacleOnBridge(
  5,
  bridgeYPositions,
  bridge1StartPositions,
  bridge1StartPositions,
  [120, 320],
  [120, 320]
)
createObstacleOnBridge(
  6,
  bridgeYPositions,
  bridge2StartPositions,
  bridge2StartPositions,
  [480, 720],
  [480, 720]
)
createObstacleOnBridge(
  5,
  bridgeYPositions,
  bridge3StartPositions,
  bridge3StartPositions,
  [880, 1080],
  [880, 1080]
)
