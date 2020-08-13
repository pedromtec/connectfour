import React, { useReducer } from 'react'
import './Game.css'
import Grid from './Grid'
import { createContext } from 'react'
import Board from '../utils/board'

const DROP_PIECE = 'DROP_PIECE'

const initialState = {
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

const dropPiece = (state, column) => {
  const board = new Board(state.currentPlayer, state.hasWinner, state.board)
  board.dropPiece(column)
  console.log(board.getBoardState())
  return board.getBoardState()
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DROP_PIECE:
      return dropPiece(state, action.col)
    default:
      return state
  }
}

export const GameContext = createContext({});

const Game = () => {

  const [state, dispatch] = useReducer(reducer, initialState)


  const dropPiece = (indexPiece) => {
    dispatch({
      type: DROP_PIECE,
      col: indexPiece
    })
  }
  const value = {
    state,
    dropPiece
  }

  return (
    <GameContext.Provider value={value}>
      <div className="game">
        <Grid grid={state.board} dropPiece={dropPiece} />
      </div>
    </GameContext.Provider>
  )
}

export default Game
