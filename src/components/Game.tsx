import React, { useReducer } from 'react'
import './Game.css'
import Grid from './Grid/Grid'
import { createContext } from 'react'
import Board from '../utils/board'

const DROP_PIECE = 'DROP_PIECE'

interface GameState {
  hasWinner: boolean,
  currentPlayer: number,
  lastDrop: { row: number; column: number } | null,
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
  const board = new Board(state.currentPlayer, state.hasWinner, state.board)
  board.dropPiece(column)
  return board.getBoardState()
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DROP_PIECE:
      return dropPiece(state, action.col)
    default:
      return state
  }
}

interface Context {
  gameState: GameState,
  dropPiece: (column: number) => void 
}

export const GameContext = createContext<Context | undefined>(undefined);

const Game = () => {

  const [gameState, dispatch] = useReducer(reducer, initialState)


  const dropPiece = (indexPiece: number) => {
    dispatch({
      type: DROP_PIECE,
      col: indexPiece
    })
  }
  const value: Context = {
    gameState,
    dropPiece
  }

  return (
    <GameContext.Provider value={value}>
      <div className="mainContainer">
        <div className="game">
          <Grid grid={gameState.board} />
        </div>
      </div>
    </GameContext.Provider>
  )
}

export default Game
