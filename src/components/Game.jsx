import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Game.css'
import Board from '../utils/board'
import HeaderStatus from './HeaderStatus'
import Grid from './Grid'

const Game = ({ initialPlayer }) => {
  const [game, setGame] = useState({
    board: new Board(initialPlayer),
  })

  function dropPiece(col) {
    const { board } = game
    if (!board.gameOver) {
      board.dropPiece(col)
    }
    setGame({ ...game })
  }

  const { board } = game
  return (
    <div className="game">
      <HeaderStatus player={board.currentPlayer} isWinner={!!board.winner} />
      <Grid grid={board.grid} dropPiece={dropPiece} />
    </div>
  )
}

Game.propTypes = {
  initialPlayer: PropTypes.number.isRequired,
}

export default Game
