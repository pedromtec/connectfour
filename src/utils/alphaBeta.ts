import { scorePosition } from './heuristic'
import ConnectFourBoard, { BoardInfo } from './board'

const INF = 100000000

interface MinimaxPayload {
  column?: number
  score: number
}

function alphaBeta(
  connectFourBoard: ConnectFourBoard,
  depth: number,
  maximazingPlayer: boolean,
  alpha: number,
  beta: number
): MinimaxPayload {
  if (connectFourBoard.hasWinner) {
    if (connectFourBoard.winner === BoardInfo.PLAYER) {
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
      const { board, currentPlayer, hasWinner } =
        connectFourBoard.getBoardState()

      const connectFourBoardCopy = new ConnectFourBoard(
        currentPlayer,
        hasWinner,
        board
      )

      connectFourBoardCopy.dropPiece(validColumn)

      const { score: newScore } = alphaBeta(
        connectFourBoardCopy,
        depth - 1,
        false,
        alpha,
        beta
      )

      if (newScore > score) {
        score = newScore
        bestColumn = validColumn
      }
      alpha = Math.max(alpha, score)
      if (alpha >= beta) break
    }
    return {
      score,
      column: bestColumn
    }
  } else {
    let score = INF
    for (const validColumn of validColumns) {
      const { board, currentPlayer, hasWinner } =
        connectFourBoard.getBoardState()
      const connectFourBoardCopy = new ConnectFourBoard(
        currentPlayer,
        hasWinner,
        board
      )

      connectFourBoardCopy.dropPiece(validColumn)

      const { score: newScore } = alphaBeta(
        connectFourBoardCopy,
        depth - 1,
        true,
        alpha,
        beta
      )
      if (newScore < score) {
        score = newScore
        bestColumn = validColumn
      }
      beta = Math.min(beta, score)
      if (alpha >= beta) break
    }
    return {
      score,
      column: bestColumn
    }
  }
}

export const getMove = (board: number[][], depth: number): Promise<number> => {
  const connectFourBoard = new ConnectFourBoard(BoardInfo.BOT, false, board)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alphaBeta(connectFourBoard, depth, true, -INF, INF).column)
    }, 0)
  })
}
