const ROWS = 6;

export class Board {

    constructor(currentPlayer = 1, initialGrid) {
        this.currentPlayer = currentPlayer
        this.grid = initialGrid.map(row => [...row])
    }

    getRow(row) {
        return this.grid[row]
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
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
        return true
    };

}