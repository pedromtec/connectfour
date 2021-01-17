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
import ConnectFourBoard, { BoardInfo, BotInfo } from './utils/board'
import { initialStateBoard } from './utils/mockedGrids'
import { useHistory } from 'react-router-dom'

const DROP_PIECE = 'DROP_PIECE'
const START = 'START'
const RESTART = 'RESTART'
const AGENT_PROCESSING = 'AGENT_PROCESSING'
const SET_BOT = 'SET_BOT'

type GameStatus = 'RUNNING' | 'FINISHED' | 'NOT_INITIALIZED'

interface GameState {
  status: GameStatus
  hasWinner: boolean
  currentPlayer: number
  selectedBot: number
  lastDrop: { row: number; column: number } | null
  board: number[][]
  isAgentProcessing: boolean
}

const initialState: GameState = {
  hasWinner: false,
  currentPlayer: 1,
  selectedBot: BotInfo.MINIMAX,
  lastDrop: null,
  board: initialStateBoard,
  isAgentProcessing: false,
  status: 'NOT_INITIALIZED'
}

const dropPiece = (state: GameState, column: number): GameState => {
  if (state.status === 'RUNNING') {
    const board = new ConnectFourBoard(
      state.currentPlayer,
      state.hasWinner,
      state.board
    )
    board.dropPiece(column)
    return {
      ...board.getBoardState(),
      isAgentProcessing: false,
      selectedBot: state.selectedBot
    }
  }
  return state
}

const reducer = (state = initialState, action: any): GameState => {
  switch (action.type) {
    case DROP_PIECE:
      return dropPiece(state, action.col)
    case START:
      return {
        ...initialState,
        status: 'RUNNING',
        currentPlayer: action.initialPlayer,
        selectedBot: action.selectedBot
      }
    case AGENT_PROCESSING:
      return {
        ...state,
        isAgentProcessing: true
      }
    case RESTART:
      return {
        ...initialState,
        selectedBot: state.selectedBot,
        status: 'NOT_INITIALIZED'
      }
    case SET_BOT:
      return {
        ...state,
        selectedBot: action.selectedBot
      }
    default:
      return state
  }
}

interface Context {
  gameState: GameState
  dropPiece: (column: number) => void
  startGame: (initialPlayer: number, selectedBot: number, depth: number) => void
  restartGame: () => void
  setSelectedBot: (selectedBot: number) => void
}

interface GameContextProps {
  children: ReactNode
  selectedBot?: number
}

export const GameContext = createContext<Context | undefined>(undefined)

const GameContextProvider: React.FC<GameContextProps> = ({
  children,
  selectedBot
}) => {
  const [gameState, dispatch] = useReducer(reducer, initialState)
  const [depth, setDepth] = useState<number | undefined>(undefined)
  const history = useHistory()

  useEffect(() => {
    if (!selectedBot) {
      history.push('/')
    }
    dispatch({
      type: SET_BOT,
      selectedBot
    })
  }, [selectedBot, history])

  const dropPiece = useCallback(
    (indexPiece: number) => {
      if (
        gameState.currentPlayer === BoardInfo.PLAYER &&
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

  const setSelectedBot = useCallback((selectedBot: number) => {
    dispatch({
      type: SET_BOT,
      selectedBot
    })
  }, [])

  const startGame = useCallback(
    (initialPlayer: number, depth: number, selectedBot: number) => {
      setDepth(depth)
      dispatch({
        type: START,
        initialPlayer,
        selectedBot
      })
    },
    []
  )

  const restartGame = useCallback(() => {
    dispatch({
      type: RESTART
    })
  }, [])

  useEffect(() => {
    if (
      gameState.currentPlayer !== BoardInfo.PLAYER &&
      gameState.status === 'RUNNING'
    ) {
      dispatch({
        type: AGENT_PROCESSING
      })
      axios
        .post(`https://connectfour-api.herokuapp.com/move`, {
          bot: gameState.selectedBot,
          board: gameState.board,
          depth
        })
        .then(({ data }) => {
          setTimeout(() => {
            dispatch({
              type: DROP_PIECE,
              col: data.column
            })
          }, 1000)
        })
    }
  }, [
    gameState.currentPlayer,
    gameState.board,
    gameState.status,
    gameState.selectedBot,
    depth
  ])

  const value: Context = useMemo(
    () => ({
      gameState,
      dropPiece,
      startGame,
      restartGame,
      setSelectedBot
    }),
    [gameState, dropPiece, startGame, restartGame, setSelectedBot]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

const useGameContext = () => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameContextProvider')
  }
  return context
}

export default { GameContextProvider, useGameContext }
