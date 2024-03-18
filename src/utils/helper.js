export const hidePlayerForm = () => {
  const playerForm = document.querySelector(".player-name-container");
  playerForm.style.display = "none";
};

export function remove(alienInvaders) {
  const squares = Array.from(document.querySelectorAll(".grid div"));

  if (!squares) {
    throw new Error("Grid squares not found");
  }

  for (const element of alienInvaders) {
    if (squares[element]) {
      squares[element]?.classList.remove("invader");
    }
  }
}

export function drawInvaders(alienInvaders, aliensRemoved) {
  const squares = Array.from(document.querySelectorAll(".grid div"));
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}
