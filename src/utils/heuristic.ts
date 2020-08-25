import { BoardConfig } from './board'

const { AGENT, PLAYER, ROWS, COLUMNS } = BoardConfig

function count(array: number[], value: number) {
  let cnt = 0
  array.forEach((a) => {
    if (a === value) {
      cnt += 1
    }
  })
  return cnt
}

function windowScore(boardWindow: number[]) {
  if (boardWindow.every((e) => e === AGENT)) {
    return 100
  }

  if (count(boardWindow, PLAYER) === 3 && count(boardWindow, 0) === 1) {
    return -10
  }

  if (count(boardWindow, AGENT) === 3 && count(boardWindow, 0) === 1) {
    return 10
  } else if (count(boardWindow, AGENT) === 2 && count(boardWindow, 0) === 2) {
    return 4
  }

  return 0
}

export function scorePosition(board: number[][]) {
  const mid = Math.floor(board[0].length / 2)
  let score = 0

  for (let i = 0; i < ROWS; i++) {
    if (board[i][mid] === AGENT) {
      score++
    }
  }

  score *= 10

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS - 3; j++) {
      const boardWindow = [
        board[i][j],
        board[i][j + 1],
        board[i][j + 2],
        board[i][j + 3]
      ]
      score += windowScore(boardWindow)
    }
  }

  for (let j = 0; j < COLUMNS; j++) {
    for (let i = 0; i < ROWS - 3; i++) {
      const boardWindow = [
        board[i][j],
        board[i + 1][j],
        board[i + 2][j],
        board[i + 3][j]
      ]
      score += windowScore(boardWindow)
    }
  }

  for (let i = 0; i < ROWS - 3; i++) {
    for (let j = 0; j < COLUMNS - 3; j++) {
      const boardWindow = [
        board[i][j],
        board[i + 1][j + 1],
        board[i + 2][j + 2],
        board[i + 3][j + 3]
      ]
      score += windowScore(boardWindow)
    }
  }

  for (let i = 0; i < ROWS - 3; i++) {
    for (let j = 3; j < COLUMNS; j++) {
      const boardWindow = [
        board[i][j],
        board[i + 1][j - 1],
        board[i + 2][j - 2],
        board[i + 3][j - 3]
      ]
      score += windowScore(boardWindow)
    }
  }

  return score
}
