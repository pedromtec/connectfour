import { getMove as getMoveMinimax } from './minimax'
import { getMove as getMoveAlphaBeta } from './alphaBeta'

const BOTS = {
  MINIMAX: 1,
  ALPHA_BETA: 2
}

const BOTS_MOVES = {
  [BOTS.MINIMAX]: getMoveMinimax,
  [BOTS.ALPHA_BETA]: getMoveAlphaBeta
}

type BotServiceParams = {
  board: number[][]
  depth: number
  bot: number
}

export async function botService({ bot, board, depth }: BotServiceParams) {
  const getMove = BOTS_MOVES[bot]
  return await getMove(board, depth)
}
