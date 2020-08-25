import React from 'react'
import './Game.css'
import Board from '../Grid'
import Button from '@material-ui/core/Button'

import GameContext from '../../GameContext'

const { useGameContext } = GameContext

const Game = () => {
  const { gameState, startGame } = useGameContext()

  return (
    <div className="mainContainer">
      <div className="game">
        <Board grid={gameState.board} />
        <div className="startContainer">
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={startGame}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Game
