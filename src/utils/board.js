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

export class Board {

    constructor(currentPlayer = 1) {
        this.currentPlayer = currentPlayer
        this.canMove = !(currentPlayer - 1)
        this.grid = initialGrid.map(row => [...row])
        this.finished = false
        this.winner = null;
    }

    async dropPiece(col, sleepAndRepaint) {
        let row = 0;
        while (row < ROWS && this.grid[row][col] === 0) {
            this.grid[row][col] = this.currentPlayer;
            sleepAndRepaint && await sleepAndRepaint(100)
            this.grid[row][col] = 0;
            sleepAndRepaint && await sleepAndRepaint()
            row++;
        }
        row--;
        if (row < 0) {
            return false
        }
        this.grid[row][col] = this.currentPlayer;
        if (this.winnerMove()) {
            this.winner = this.currentPlayer
            this.finished = true
            return false
        }
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
        return true
    };

    winnerMove() {
        return false
    }

}