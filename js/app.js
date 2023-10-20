const timeLeftcounter = document.querySelector("#time-left")
const startButton = document.querySelector("#start-button")
const cells = document.querySelectorAll(".cell")
const imageFrog = document.createElement("img")
imageFrog.src = "./img/frog-svgrepo-com.svg"
imageFrog.classList.add("frog")
let currentIndex = 449
const width = 31

cells[currentIndex].appendChild(imageFrog)

function move(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (currentIndex % width !== 0) {
        currentIndex -= 1
      }
      break
    case "ArrowRight":
      if (currentIndex % width < width - 1) {
        currentIndex += 1
      }
      break
    case "ArrowUp":
      if (currentIndex - width >= 0) {
        currentIndex -= width
      }
      break
    case "ArrowDown":
      if (currentIndex + width < width * 15) {
        currentIndex += width
      }
      break
  }
  cells[currentIndex].appendChild(imageFrog)
}

document.addEventListener("keyup", move)
