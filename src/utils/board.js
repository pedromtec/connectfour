const ROWS = 6
const COLUMNS = 7
const EMPTY = 0
const ONE = 1
const TWO = 2
const WINNER = 3

function newArray(len, value) {
  return Array(len).fill(value)
}

function isOut(row, col) {
  return row < 0 || row >= ROWS || col < 0 || col >= COLUMNS
}

export default class Board {
  constructor(currentPlayer = ONE, hasWinner = false, grid) {
    this.lastDrop = null
    this.currentPlayer = currentPlayer
    this.grid = grid ? grid : newArray(ROWS).map(() => newArray(COLUMNS, 0))
    this.gameOver = false
    this.hasWinner = hasWinner
    this.emptyCells = ROWS * COLUMNS
    this.winner = null
  }

  getBoardState() {
    return {
      hasWinner: this.hasWinner,
      lastDrop: this.lastDrop,
      currentPlayer: this.currentPlayer,
      board: this.grid.map(row => [...row])
    }
  }

  changeTurn() {
    this.currentPlayer = this.currentPlayer === ONE ? TWO : ONE
  }

  getRow(col) {
    let row = 0
    while (row < ROWS && this.grid[row][col] === EMPTY) {
      row += 1
    }
    return row - 1
  }

  dropPiece(col) {
    if (this.gameOver || this.hasWinner) {
      return false
    }

    const row = this.getRow(col)
    if (row < 0) {
      return false
    }
    this.lastDrop = {row, col}
    this.grid[row][col] = this.currentPlayer
    this.emptyCells -= 1
    const winnerMoves = this.winnerMove(row, col)
    if (winnerMoves) {
      this.hasWinner = true
      this.gameOver = true
      this.winner = this.currentPlayer
      this.fillGrid(winnerMoves)
      return true
    }
    if (!this.emptyCells) {
      this.gameOver = true
    }
    this.changeTurn()
    return true
  }

  winnerMove(row, col) {
    const primaryDif = Math.min(row, col)
    const secondaryDif = Math.min(row, COLUMNS - col - 1)

    const directions = [
      [row, 0, 0, 1],
      [0, col, 1, 0],
      [row - primaryDif, col - primaryDif, 1, 1],
      [row - secondaryDif, col + secondaryDif, 1, -1],
    ]
    const winnerCells = []
    directions.forEach(direction => {
      const result = this.checkLine(...direction)
      if (result) winnerCells.push(...result)
    })
    return winnerCells.length > 0 ? winnerCells : null
  }

  checkLine(row, col, deltaRow, deltaCol) {
    let line = []
    let maxLine = []
    while (!isOut(row, col)) {
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
    cells.forEach(([row, col]) => {
      this.grid[row][col] = WINNER
    })
  }

}
