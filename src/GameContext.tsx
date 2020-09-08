import React, {
  useReducer,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import { createContext } from 'react'
import ConnectFourBoard from './utils/board'

const DROP_PIECE = 'DROP_PIECE'
const START = 'START'
const RESTART = 'RESTART'
const AGENT_PROCESSING = 'AGENT_PROCESSING'
const PLAYER = 1

type GameStatus = 'RUNNING' | 'FINISHED' | 'NOT_INITIALIZED'

interface GameState {
  status: GameStatus
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
  isAgentProcessing: false,
  status: 'NOT_INITIALIZED'
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

const reducer = (state = initialState, action: any): GameState => {
  switch (action.type) {
    case DROP_PIECE:
      return dropPiece(state, action.col)
    case START:
      return {
        ...initialState,
        status: 'RUNNING',
        currentPlayer: action.initialPlayer
      }
    case AGENT_PROCESSING:
      return {
        ...state,
        isAgentProcessing: true
      }
    case RESTART:
      return {
        ...initialState,
        status: 'NOT_INITIALIZED'
      }
    default:
      return state
  }
}

interface Context {
  gameState: GameState
  dropPiece: (column: number) => void
  startGame: (initialPlayer: number, depth: number) => void
  restartGame: () => void
}

interface GameContextProps {
  children: ReactNode
}

export const GameContext = createContext<Context | undefined>(undefined)

const GameContextProvider: React.FC<GameContextProps> = ({ children }) => {
  const [gameState, dispatch] = useReducer(reducer, initialState)
  const [depth, setDepth] = useState<number>(5)

  const dropPiece = useCallback(
    (indexPiece: number) => {
      if (
        gameState.currentPlayer === PLAYER &&
        gameState.status === 'RUNNING'
      ) {
        dispatch({
          type: DROP_PIECE,
          col: indexPiece
        })
      }
    },
    [gameState.currentPlayer, gameState.status]
  )

  const startGame = useCallback((initialPlayer: number, depth: number) => {
    setDepth(depth)
    dispatch({
      type: START,
      initialPlayer
    })
  }, [])

  const restartGame = useCallback(() => {
    dispatch({
      type: RESTART
    })
  }, [])

  useEffect(() => {
    if (gameState.currentPlayer !== PLAYER && gameState.status === 'RUNNING') {
      dispatch({
        type: AGENT_PROCESSING
      })
      axios
        .post(`http://localhost:8080/move`, {
          board: gameState.board,
          depth
        })
        .then(({ data }) => {
          setTimeout(() => {
            dispatch({
              type: DROP_PIECE,
              col: data.column
            })
          }, 200)
        })
    }
  }, [gameState.currentPlayer, gameState.board, gameState.status, depth])

  const value: Context = useMemo(
    () => ({
      gameState,
      dropPiece,
      startGame,
      restartGame
    }),
    [gameState, dropPiece, startGame, restartGame]
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
