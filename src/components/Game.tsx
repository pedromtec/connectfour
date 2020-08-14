import React, { useReducer } from 'react'
import './Game.css'
import Grid from './Grid/Grid'
import { createContext } from 'react'
import Board from '../utils/board'
import Button from "@material-ui/core/Button";

const DROP_PIECE = 'DROP_PIECE'
const START = 'START'

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
    case START:
      return { ...initialState }
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

  console.log({gameState})
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
          <div className="startContainer">
            <Button fullWidth={true} variant="contained" color="primary" onClick={() => dispatch({
              type: START,
            })}>
              Start
          </Button>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  )
}

export default Game
