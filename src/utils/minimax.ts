import { scorePosition } from './heuristic'
import ConnectFourBoard, { BoardConfig } from './board'

const INF = 100000000

interface MinimaxPayload {
  column?: number
  score: number
}

function minimax(
  connectFourBoard: ConnectFourBoard,
  depth: number,
  maximazingPlayer: boolean
): MinimaxPayload {
  if (connectFourBoard.hasWinner) {
    if (connectFourBoard.winner === BoardConfig.PLAYER) {
      return {
        score: -INF
      }
    } else {
      return {
        score: INF
      }
    }
  }

  if (depth === 0) {
    return {
      score: scorePosition(connectFourBoard.grid)
    }
  }

  const validColumns: number[] = []

  connectFourBoard.grid[0].forEach((ele, index) => {
    if (!ele) {
      validColumns.push(index)
    }
  })

  if (!validColumns.length) {
    return {
      score: 0
    }
  }

  let bestColumn = validColumns[Math.floor(Math.random() * validColumns.length)]

  if (maximazingPlayer) {
    let score = -INF
    for (const validColumn of validColumns) {
      const {
        board,
        currentPlayer,
        hasWinner
      } = connectFourBoard.getBoardState()

      const connectFourBoardCopy = new ConnectFourBoard(
        currentPlayer,
        hasWinner,
        board
      )

      connectFourBoardCopy.dropPiece(validColumn)

      const { score: newScore } = minimax(
        connectFourBoardCopy,
        depth - 1,
        false
      )

      if (newScore > score) {
        score = newScore
        bestColumn = validColumn
      }
    }
    return {
      score,
      column: bestColumn
    }
  } else {
    let score = INF
    for (const validColumn of validColumns) {
      const {
        board,
        currentPlayer,
        hasWinner
      } = connectFourBoard.getBoardState()
      const connectFourBoardCopy = new ConnectFourBoard(
        currentPlayer,
        hasWinner,
        board
      )

      connectFourBoardCopy.dropPiece(validColumn)

      const { score: newScore } = minimax(connectFourBoardCopy, depth - 1, true)
      if (newScore < score) {
        score = newScore
        bestColumn = validColumn
      }
    }
    return {
      score,
      column: bestColumn
    }
  }
}

export const getMove = async (board: number[][]) => {
  console.log('called')
  const connectFourBoard = new ConnectFourBoard(BoardConfig.AGENT, false, board)
  const result = minimax(connectFourBoard, 7, true)
  console.log('Finish')
  return result.column!
}
