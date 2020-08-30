import React, {
  useReducer,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useEffect
} from 'react'
import axios from 'axios'
import { createContext } from 'react'
import ConnectFourBoard from './utils/board'

const DROP_PIECE = 'DROP_PIECE'
const START = 'START'
const AGENT_PROCESSING = 'AGENT_PROCESSING'
const PLAYER = 1

interface GameState {
  hasWinner: boolean
  currentPlayer: number
  lastDrop: { row: number; column: number } | null
  board: number[][]
  isAgentProcessing: boolean
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
  isAgentProcessing: false
}

const dropPiece = (state: GameState, column: number): GameState => {
  const board = new ConnectFourBoard(
    state.currentPlayer,
    state.hasWinner,
    state.board
  )
  board.dropPiece(column)
  return { ...board.getBoardState(), isAgentProcessing: false }
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DROP_PIECE:
      return dropPiece(state, action.col)
    case START:
      return { ...initialState }
    case AGENT_PROCESSING:
      return {
        ...state,
        isAgentProcessing: true
      }
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
      if (gameState.currentPlayer === PLAYER) {
        dispatch({
          type: DROP_PIECE,
          col: indexPiece
        })
      }
    },
    [gameState.currentPlayer]
  )

  const startGame = useCallback(() => {
    dispatch({
      type: START
    })
  }, [])

  useEffect(() => {
    if (gameState.currentPlayer !== PLAYER && !gameState.hasWinner) {
      dispatch({
        type: AGENT_PROCESSING
      })
      axios
        .post(`http://localhost:8080/move`, {
          board: gameState.board
        })
        .then((res) => {
          console.log(res)
          dispatch({
            type: DROP_PIECE,
            col: res.data.column
          })
        })
    }
  }, [gameState.currentPlayer, gameState.board, gameState.hasWinner])

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
