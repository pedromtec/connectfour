const ROWS = 6
const COLUMNS = 7
const EMPTY = 0
const ONE = 1
const TWO = 2
const WINNER = 3

export const BotInfo = {
  MINIMAX: 1,
  ALPHA_BETA: 2
}

export const BoardInfo = {
  PLAYER: ONE,
  BOT: TWO,
  WINNER,
  EMPTY,
  ROWS,
  COLUMNS
}

export const BotLevels = {
  [BotInfo.MINIMAX]: [
    { depth: 3, label: 'Easy' },
    { depth: 4, label: 'Medium' },
    { depth: 5, label: 'Hard' }
  ],
  [BotInfo.ALPHA_BETA]: [
    { depth: 5, label: 'Easy' },
    { depth: 6, label: 'Medium' },
    { depth: 7, label: 'Hard' }
  ]
}

type GameStatus = 'RUNNING' | 'FINISHED' | 'NOT_INITIALIZED'

function newArray(len: number, value?: number) {
  return Array(len).fill(value)
}

function isOut(row: number, col: number) {
  return row < 0 || row >= ROWS || col < 0 || col >= COLUMNS
}

export default class Board {
  lastDrop: { row: number; column: number } | null
  currentPlayer: number
  grid: number[][]
  hasWinner: boolean
  emptyCells: number
  winner: number | null
  status: GameStatus

  constructor(currentPlayer = ONE, hasWinner = false, grid: number[][]) {
    this.lastDrop = null
    this.currentPlayer = currentPlayer
    this.grid = grid
      ? grid.map((row) => [...row])
      : newArray(ROWS).map(() => newArray(COLUMNS, 0))
    this.hasWinner = hasWinner
    this.emptyCells = ROWS * COLUMNS
    this.winner = null
    this.status = 'RUNNING'
  }

  getBoardState() {
    return {
      hasWinner: this.hasWinner,
      lastDrop: this.lastDrop,
      currentPlayer: this.currentPlayer,
      board: this.grid.map((row) => [...row]),
      status: this.status
    }
  }

  changeTurn() {
    this.currentPlayer = this.currentPlayer === ONE ? TWO : ONE
  }

  getRow(column: number) {
    let row = 0
    while (row < ROWS && this.grid[row][column] === EMPTY) {
      row += 1
    }
    return row - 1
  }

  dropPiece(column: number) {
    if (this.status === 'FINISHED' || this.hasWinner) {
      return false
    }

    const row = this.getRow(column)
    if (row < 0) {
      return false
    }
    this.lastDrop = { row, column }
    this.grid[row][column] = this.currentPlayer
    this.emptyCells -= 1
    const winnerMoves = this.winnerMove(row, column)
    if (winnerMoves) {
      this.hasWinner = true
      this.status = 'FINISHED'
      this.winner = this.currentPlayer
      this.fillGrid(winnerMoves)
      return true
    }
    if (!this.emptyCells) {
      this.status = 'FINISHED'
    }
    this.changeTurn()
    return true
  }

  winnerMove(row: number, column: number) {
    const primaryDif = Math.min(row, column)
    const secondaryDif = Math.min(row, COLUMNS - column - 1)

    const directions: [number, number, number, number][] = [
      [row, 0, 0, 1],
      [0, column, 1, 0],
      [row - primaryDif, column - primaryDif, 1, 1],
      [row - secondaryDif, column + secondaryDif, 1, -1]
    ]
    const winnerCells: number[][] = []

    directions.forEach((direction) => {
      const result = this.checkLine(...direction)
      if (result) winnerCells.push(...result)
    })
    return winnerCells.length > 0 ? winnerCells : null
  }

  checkLine(row: number, col: number, deltaRow: number, deltaCol: number) {
    let line = []
    let maxLine: number[][] = []
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

  fillGrid(cells: number[][]) {
    cells.forEach(([row, col]) => {
      this.grid[row][col] = WINNER
    })
  }
}
