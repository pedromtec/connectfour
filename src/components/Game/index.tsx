import React from 'react'
import Board from '../Grid'
import { CircularProgress, Button } from '@material-ui/core'
import * as S from './styled'
import GameContext from '../../GameContext'

const { useGameContext } = GameContext

const Game = () => {
  const { gameState, startGame } = useGameContext()

  return (
    <S.GameContainer>
      <S.GameWrapper>
        {gameState.isAgentProcessing && (
          <S.SpinnerWrapper>
            <CircularProgress size={40} color="secondary" thickness={5.5} />
          </S.SpinnerWrapper>
        )}
        <Board grid={gameState.board} />
        <S.ButtonWrapper>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={startGame}
          >
            Start
          </Button>
        </S.ButtonWrapper>
      </S.GameWrapper>
    </S.GameContainer>
  )
}

export default Game
