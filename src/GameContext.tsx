import React, {
  useReducer,
  ReactNode,
  useContext,
  useCallback,
  useMemo
} from 'react'
import { createContext } from 'react'
import ConnectFourBoard from './utils/board'

const DROP_PIECE = 'DROP_PIECE'
const START = 'START'

interface GameState {
  hasWinner: boolean
  currentPlayer: number
  lastDrop: { row: number; column: number } | null
  board: number[][]
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
  ]
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

  const dropPiece = useCallback((indexPiece: number) => {
    dispatch({
      type: DROP_PIECE,
      col: indexPiece
    })
  }, [])

  const startGame = useCallback(() => {
    dispatch({
      type: START
    })
  }, [])

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
