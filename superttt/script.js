const tiles = document.querySelectorAll(".tile");
const minorWins = document.querySelectorAll(".minor-win");
const minorWinsGrid = document.getElementById("minor-win-grid");
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
    } else {
        tile.innerText = O;
        boardState[tileNumber - 1] = O;
    }
    checkMinorWin(tileNumber - 1);
    turn = turn === X ? O : X;
    setHoverText();
}
// ----------------------------

// winning-logic --------------
function checkMinorWin(tileIndex) {
    if (checkMinorRow(tileIndex) || checkMinorColumn(tileIndex) || checkMinorDiagonal(tileIndex)) {
        bringMinorWinToFront(tileIndex);
    }
}
function checkMinorRow(tileIndex) {
    const row = Math.floor(tileIndex / 9);
    var col = Math.floor((tileIndex % 9) / 3) * 3;
    for (var i = 0; i < 3; i++) {
        if (tiles[row * 9 + col].innerHTML != turn) {
            return false;
        }
        col++;
    }
    return true;
}
function checkMinorColumn(tileIndex) {
    const col = tileIndex % 9;
    var row = Math.floor(Math.floor(tileIndex / 9) / 3) * 3;
    for (var i = 0; i < 3; i++) {
        if (tiles[row * 9 + col].innerHTML != turn) {
            return false;
        }
        row++;
    }
    return true;
}
function checkMinorDiagonal(tileIndex) {
    const row0 = Math.floor(Math.floor(tileIndex / 9) / 3) * 3
    const col0 = Math.floor((tileIndex % 9) / 3) * 3;
    return (
        tiles[row0 * 9 + col0].innerHTML == turn &&
        tiles[(row0 + 1) * 9 + col0 + 1].innerHTML == turn &&
        tiles[(row0 + 2) * 9 + col0 + 2].innerHTML == turn
    ) ||
        (
            tiles[row0 * 9 + col0 + 2].innerHTML == turn &&
            tiles[(row0 + 1) * 9 + col0 + 1].innerHTML == turn &&
            tiles[(row0 + 2) * 9 + col0].innerHTML == turn
        );
}
// ----------------------------

// restart-game ---------------
function restartGame() {
    minorWins.forEach(minorWin => {
        minorWin.classList.toggle("hidden");
    });
}
restartGame();
// ----------------------------

// minor-win ------------------
function bringMinorWinToFront(tileIndex) {
    const row = Math.floor(Math.floor(tileIndex / 9) / 3);
    const col = Math.floor((tileIndex % 9) / 3);
    minorWinIndex = row * 3 + col;
    minorWins[minorWinIndex].classList.toggle("hidden");
    minorWins[minorWinIndex].classList.toggle("top-element");
    minorWins[minorWinIndex].style.marginTop = findMarginTop(row, col);
    minorWins[minorWinIndex].style.marginLeft = findMarginLeft(row, col)
    minorWins[minorWinIndex].innerHTML = turn;
}
function findMarginTop(row, col) {
    let margin = 72 * 3 * row - 6;
    return `${margin}px`;
}
function findMarginLeft(row, col) {
    let margin = 72 * 3 * col + 17;
    return `${margin}px`
}
// ----------------------------