import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Game.css'
import Board from '../utils/board'
import HeaderStatus from './HeaderStatus'
import Grid from './Grid'
import { useRef } from 'react'


const clonedGrid = (grid) => grid.map(row => [...row])

const Game = ({ you }) => {
  
  const boardRef = useRef(new Board())

  const [game, setGame] = useState({
    currentPlayer: boardRef.current.currentPlayer,
    grid: clonedGrid(boardRef.current.grid),
    gameOver: boardRef.current.gameOver,
    hasWinner: boardRef.current.hasWinner
  })
  

  const dropPiece = (col) => {
    boardRef.current.dropPiece(col)
    const { currentPlayer, grid, gameOver, hasWinner } = boardRef.current
    setGame({ currentPlayer, grid: clonedGrid(grid), gameOver, hasWinner })
  }

  const { currentPlayer, gameOver, hasWinner } = game

  let messageStatus = currentPlayer === you ? 'You' : 'AI'

  if(gameOver) {
    if(hasWinner) {
      messageStatus += ' won!'
    }else {
      messageStatus = 'Empate!'
    }
  }else {
    messageStatus += ' turn'
  }

  return (
    <div className="game">
      <HeaderStatus>
        {messageStatus}
      </HeaderStatus>
      <Grid grid={game.grid} dropPiece={dropPiece} />
    </div>
  )
}

Game.propTypes = {
  you: PropTypes.number.isRequired,
}

export default Game
