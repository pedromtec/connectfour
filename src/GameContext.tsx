import React, {
  useReducer,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useEffect
} from 'react'
import { createContext } from 'react'
import ConnectFourBoard from './utils/board'
import { getMove } from './utils/minimax'

const DROP_PIECE = 'DROP_PIECE'
const START = 'START'

interface GameState {
  hasWinner: boolean
  currentPlayer: number
  lastDrop: { row: number; column: number } | null
  board: number[][]
  isAgentTurn: boolean
}

const initialState: GameState = {
  hasWinner: false,
  currentPlayer: 1,
  lastDrop: null,
  board: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ],
  isAgentTurn: false
}

const dropPiece = (state: GameState, column: number): GameState => {
  const board = new ConnectFourBoard(
    state.currentPlayer,
    state.hasWinner,
    state.board
  )
  board.dropPiece(column)
  return board.getBoardState()
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DROP_PIECE:
      return dropPiece(state, action.col)
    case START:
      return { ...initialState }
    default:
      return state
  }
}

interface Context {
  gameState: GameState
  dropPiece: (column: number) => void
  startGame: () => void
}

interface GameContextProps {
  children: ReactNode
}

export const GameContext = createContext<Context | undefined>(undefined)

const GameContextProvider: React.FC<GameContextProps> = ({ children }) => {
  const [gameState, dispatch] = useReducer(reducer, initialState)

  const dropPiece = useCallback(
    (indexPiece: number) => {
      if (!gameState.isAgentTurn) {
        dispatch({
          type: DROP_PIECE,
          col: indexPiece
        })
      }
    },
    [gameState.isAgentTurn]
  )

  const startGame = useCallback(() => {
    dispatch({
      type: START
    })
  }, [])

  useEffect(() => {
    const aiMove = async () => {
      if (gameState.isAgentTurn) {
        const column = await getMove(gameState.board)
        dispatch({
          type: DROP_PIECE,
          col: column
        })
      }
    }
    aiMove()
  }, [gameState.isAgentTurn, gameState.board])

  const value: Context = useMemo(
    () => ({
      gameState,
      dropPiece,
      startGame
    }),
    [gameState, dropPiece, startGame]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

const useGameContext = () => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error(
      'useWindowContext must be used within a WindowContextProvider'
    )
  }
  return context
}

export default { GameContextProvider, useGameContext }
