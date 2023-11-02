const tiles = document.querySelectorAll(".tile");
tiles.forEach(tile => tile.addEventListener("click", tileClick));

var shuffledList = [];
var mineIndices = new Set();

function shuffle() {
    shuffledList = [];
    for (var i = 1; i <= 100; i++) {
        shuffledList.push(i);
    }
    var lastIndex = 99;
    while (lastIndex >= 0) {
        const randomIndex = Math.floor(Math.random() * (lastIndex+1));
        let a = shuffledList[randomIndex];
        shuffledList[randomIndex] = shuffledList[lastIndex];
        shuffledList[lastIndex] = a;
        lastIndex--;
    }
}

function setMines() {
    mineIndices = new Set();
    for (var i = 0; i < 20; i++) {
        mineIndices.add(shuffledList[i]);
    }
    tiles.forEach(tile => {
        if (mineIndices.has(parseInt(tile.dataset.index))) {
            tile.innerText = "O";
        }
    })
}

shuffle();
setMines();

function tileClick(event) {
    const tile = event.target;
    

}