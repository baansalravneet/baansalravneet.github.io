const ALIVE_CLASS = "alive";
const CELL_CLASS = "cell";
const cells = document.querySelectorAll("." + CELL_CLASS);
const nextState = Array(cells.length);
const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const ROWS = 100;
const COLS = 100;
const REFRESH_TIME_MS = 2000;

cells.forEach(cell => {
    cell.classList.remove(ALIVE_CLASS);
    let alive = Math.floor(Math.random() * 2);
    if (alive === 1) {
        cell.classList.add(ALIVE_CLASS);
    }
});

function lifeLoop() {
    setInterval(() => {
        cells.forEach(cell => {
            const index = cell.dataset.index;
            nextState[index] = findNextState(cell);
        });
        cells.forEach(cell => {
            const index = cell.dataset.index;
            cell.classList.remove(ALIVE_CLASS);
            if (nextState[index] === 1) {
                cell.classList.add(ALIVE_CLASS);
            }
        });
    }, REFRESH_TIME_MS);
}

function findNextState(cell) {
    const aliveNeighbours = getAliveNeighbours(cell.dataset.index);
    if (isAlive(cell)) {
        console.log(cell.dataset.index);
        if (aliveNeighbours > 3 || aliveNeighbours < 2) return 0;
        else return 1;
    } else {
        if (aliveNeighbours === 3) return 1;
        else return 0;
    }
}

function isAlive(cell) {
    return cell.classList.contains(ALIVE_CLASS);
}

function getAliveNeighbours(index) {
    const row = Math.floor(index / ROWS);
    const col = index % COLS;
    var count = 0;
    directions.forEach(d => {
        const nextRow = (row + d[0] + ROWS) % ROWS;
        const nextCol = (col + d[1] + COLS) % COLS;
        if (isAlive(cells[nextRow * ROWS + nextCol])) count++;
    })
    return count;
}

lifeLoop();