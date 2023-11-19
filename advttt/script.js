const tiles = document.querySelectorAll(".tile");
const X = "💙";
const O = "💚";

let turn = X;

const boardState = Array(tiles.length);
boardState.fill(null);

tiles.forEach(tile => tile.addEventListener("click", tileClick));


// hover-effect ---------------
function setHoverText() {
    removeHoverText();
    // set hover
    const hoverClass = turn === X ? `x-hover` : `o-hover`;
    tiles.forEach(tile => {
        if (tile.innerText === "") {
            tile.classList.add(hoverClass);
        }
    })
}
function removeHoverText() {
    tiles.forEach(tile => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    })
}
setHoverText();
// ----------------------------

// tile-click -----------------
function tileClick(event) {
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != "") return;
    if (turn === X) {
        tile.innerText = X;
        boardState[tileNumber - 1] = X;
        turn = O;
    } else {
        tile.innerText = O;
        boardState[tileNumber - 1] = O;
        turn = X;
    }
    setHoverText();
}