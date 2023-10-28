window.onload = function () {
  const startButton = document.getElementById("start-button")
  const restartButtons = document.querySelectorAll(".restart-button")
  let game

  startButton.addEventListener("click", function () {
    startGame()
  })

  restartButtons.forEach((restartButton) =>
    restartButton.addEventListener("click", function () {
      restartGame()
    })
  )

  function startGame() {
    console.log("start game")
    game = new Game(obstaclesLev1)

    game.start()
    game.update()
  }

  function restartGame() {
    location.reload()
  }
}
