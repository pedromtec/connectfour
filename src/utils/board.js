const initialGrid = [];
const ROWS = 6;
const COLUMNS = 7;

for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLUMNS; j++) {
        row.push(0);
    }
    initialGrid.push(row);
}

const EMPTY = 0
const ONE = 1
const TWO = 2
const WINNER = 3
export class Board {

    constructor(currentPlayer = ONE) {
        this.currentPlayer = currentPlayer
        this.grid = initialGrid.map(row => [...row])
        this.gameOver = false
        this.winner = undefined;
    }
    changeTurn() {
        this.currentPlayer = this.currentPlayer === ONE ? TWO : ONE
    }

    isOut(row, col) {
        return row < 0 || row >= ROWS || col < 0 || col >= COLUMNS
    }
    dropPiece(col) {
        if (this.gameOver)
            return false
        let row = 0;
        while (row < ROWS && this.grid[row][col] === EMPTY) {
            row++
        }
        row--;
        if (row < 0) {
            return false
        }
        this.grid[row][col] = this.currentPlayer;
        const winnerMoves = this.winnerMove(row, col)
        if (winnerMoves) {
            this.winner = this.currentPlayer
            this.gameOver = true
            this.fillGrid(winnerMoves)
            return true
        }
        this.changeTurn()
        return true
    }

    winnerMove(row, col) {
        const primaryDif = Math.min(row, col)
        const secundaryDif = Math.min(row, COLUMNS - col - 1)

        const directions = [
            [row, 0, 0, 1],
            [0, col, 1, 0],
            [row - primaryDif, col - primaryDif, 1, 1],
            [row - secundaryDif, col + secundaryDif, 1, -1]
        ]
        const winnerCells = []
        directions.forEach(direction => {
            const result = this.checkLine(...direction)
            if (result)
                winnerCells.push(...result)
        })
        return winnerCells.length > 0 ? winnerCells : null
    }
    checkLine(row, col, deltaRow, deltaCol) {
        let line = []
        let maxLine = []
        while (!this.isOut(row, col)) {
            if (this.grid[row][col] === this.currentPlayer) {
                line.push([row, col])
            } else {
                line = []
            }
            if (line.length > maxLine.length) {
                maxLine = line
            }
            row += deltaRow
            col += deltaCol
        }
        return maxLine.length >= 4 ? maxLine : null
    }
    fillGrid(cells) {
        cells.forEach(([row, col]) => this.grid[row][col] = WINNER)
    }
}