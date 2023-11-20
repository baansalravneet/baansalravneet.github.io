const tiles = document.querySelectorAll(".tile");
const minorWins = document.querySelectorAll(".minor-win");
const minorWinsGrid = document.getElementById("minor-win-grid");
const X = "💙";
const O = "💚";

const winningCombos = [
    // rows
    [0,1,2],[3,4,5],[6,7,8],
    // columns
    [0,3,6],[1,4,7],[2,5,8],
    // diagonals
    [0,4,8],[2,4,6]
];

let turn = X;
let activeMinor = -1 // -1 for all active

const minorState = Array(9);
minorState.fill(0); // -1 - unavailable | 0 - available | 1 - X win | 2 - O win | 3 - draw

tiles.forEach(tile => tile.addEventListener("click", tileClick));

// hover-effect ---------------
function setHoverText() {
    removeHoverText();
    // set hover
    const hoverClass = turn === X ? `x-hover` : `o-hover`;
    tiles.forEach(tile => {
        if (tile.innerText === "" && minorState[tile.dataset.minor - 1] == 0 && (activeMinor == -1 || activeMinor == tile.dataset.minor - 1)) {
            tile.classList.add(hoverClass);
        }
    });
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
    if (minorState[tile.dataset.minor - 1] != 0) return;
    if (tile.dataset.minor - 1 != activeMinor && activeMinor != -1) return;
    if (turn === X) {
        tile.innerText = X;
    } else {
        tile.innerText = O;
    }
    updateMinorState(tile, tileNumber - 1);
    setActiveMinor(tileNumber - 1);
    turn = turn === X ? O : X;
    setHoverText();
}
// ----------------------------

// udpate minor state --------------
function updateMinorState(tile, tileIndex) {
    if (checkMinorRowWin(tileIndex) || checkMinorColumnWin(tileIndex) || checkMinorDiagonalWin(tileIndex)) {
        bringMinorWinToFront(tileIndex);
        minorState[tile.dataset.minor - 1] = turn == X ? 1 : 2;
        if (checkMajorWin(tile.dataset.minor - 1)) {
            showWinFrame();
        }
        return;
    }
    if (checkForMinorDraw(tileIndex)) {
        minorState[tile.dataset.minor - 1] = 3;
    }
    if (checkForMajorDraw()) {
        showDrawFrame();
    }

}
function checkForMajorDraw() {
    for (var i = 0; i < 9; i++) {
        if (minorState[i] == 0) return false;
    }
    return true;
}
function checkForMinorDraw(tileIndex) {
    var row0 = Math.floor(Math.floor(tileIndex / 9) / 3) * 3
    var col0 = Math.floor((tileIndex % 9) / 3) * 3;
    for (i = row0; i < row0 + 3; i++) {
        for (j = col0; j < col0 + 3; j++) {
            const tileIndex = i * 9 + j;
            if (tiles[tileIndex].innerHTML == "") return false;
        }
    }
    return true;
}
function checkMinorRowWin(tileIndex) {
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
function checkMinorColumnWin(tileIndex) {
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
function checkMinorDiagonalWin(tileIndex) {
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
function setActiveMinor(tileIndex) {
    const minorRow = Math.floor(tileIndex / 9) % 3;
    const minorCol = Math.floor(tileIndex % 9) % 3;
    const next = minorRow * 3 + minorCol;
    if (minorState[next] != 0) {
        activeMinor = -1;
    } else {
        activeMinor = next;
    }
}
// ----------------------------

// check major win ------------
function checkMajorWin() {
    for (const combo of winningCombos) {
        const v1 = minorState[combo[0]];
        const v2 = minorState[combo[1]];
        const v3 = minorState[combo[2]];
        if (
            v1 == (turn == X ? 1 : 2) &&
            v2 == (turn == X ? 1 : 2) &&
            v3 == (turn == X ? 1 : 2)
        ) {
            return true;
        }
    }
    return false;
}
// ----------------------------

// restart-game ---------------
function restartGame() { // PENDING
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

// end game frame -------------
function showDrawFrame() {
    console.log("draw");
}
function showWinFrame() {
    const winner = turn;
    console.log(`${winnder} is the winner`);
}
// ----------------------------