const tiles = document.querySelectorAll(".tile");
const tileMap = new Map();
tiles.forEach(tile => {
    tile.addEventListener("click", tileClick);
    tileMap.set(parseInt(tile.dataset.index), tile);
});

var shuffledList = [];
var adjacent = []; // -1 = mine

const directions = [[-1,-1], [-1,0], [-1,1],
                    [ 0,-1],         [ 0,1],
                    [ 1,-1], [ 1,0], [ 1,1]];

function shuffle() {
    shuffledList = [];
    for (var i = 0; i <= 99; i++) {
        shuffledList.push(i);
        adjacent.push(0);
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

function getNeighbourIndices(i) {
    const row = Math.floor(i/10);
    const col = i%10;
    var result = [];
    directions.forEach(d => {
        const nextRow = row + d[0];
        const nextCol = col + d[1];
        const nextIndex = nextRow*10 + nextCol;
        if (nextRow >= 0 && nextRow < 10 && 
            nextCol >= 0 && nextCol < 10) {
            result.push(nextIndex);
        }
    })
    return result;
}

function findMineCount(adjacent, i) {
    var neighbourIndices = getNeighbourIndices(i);
    var count = 0;
    neighbourIndices.forEach(x => {
        if (adjacent[x] == -1) {
            count++;
        }
    });
    return count;
}

function setMines() {
    for (var i = 0; i < 10; i++) {
        adjacent[shuffledList[i]] = -1;
    }
    for (var i = 0; i < 99; i++) {
        if (adjacent[i] != -1) {
            adjacent[i] = findMineCount(adjacent, i);
        }
    }
}

function floodFill(index) {
    if (tileMap.get(index).innerText != "" &&
        tileMap.get(index).innerText != "F") {
            return;
        }
    tileMap.get(index).innerText = adjacent[index];
    tileMap.get(index).style.backgroundColor = "grey";
    if (adjacent[index] == 0) {
        const nextIndices = getNeighbourIndices(index);
        nextIndices.forEach(i => floodFill(i));
    }
}

shuffle();
setMines();

function tileClick(event) {
    const tile = event.target;
    var clickedIndex = parseInt(tile.dataset.index);
    if (adjacent[clickedIndex] == -1) {
        tile.style.backgroundColor = "red";
        tile.innerText = "X";
    } else {
        floodFill(clickedIndex);
    }
}