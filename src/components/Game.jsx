import React, { useReducer } from 'react'
import './Game.css'
import Grid from './Grid'

const DROP_PIECE = 'DROP_PIECE'

const initialState = {
  lastDrop: undefined,
  board: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]
}

const rowOf = (col, board) => {
  let row = 0
  while (row < 6 && board[row][col] === 0) {
    row += 1
  }
  return row - 1
}

const dropPiece = (state, j, piece) => {

  const { board } = state
  const i = rowOf(j, board)
  console.log(j)
  const getCol = (col, indexCol) => 
    indexCol === j ? piece : col

  const getRow = (row, indexRow) => 
    indexRow === i ? row.map(getCol) : row

  return {
    board: board.map(getRow),
    lastDrop: {row: i, col: j}
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case DROP_PIECE: 
      return dropPiece(state, action.col, action.piece)
    default: 
      return state
  }
}


const Game = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const dropPiece = (indexPiece) => {
    console.log(indexPiece)
    dispatch({
      type: DROP_PIECE,
      col: indexPiece,
      piece: 1
    })
  }

  return (
    <div className="game">
      <Grid grid={state.board} dropPiece={dropPiece}/>
    </div>
  )
}

export default Game
