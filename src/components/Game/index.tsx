import React from 'react'
import Board from '../Grid'
import { CircularProgress, Button } from '@material-ui/core'
import * as S from './styled'
import GameContext from '../../GameContext'
import HeaderStatus from '../HeaderStatus'

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

        <HeaderStatus player={gameState.currentPlayer} />

        <Board grid={gameState.board} />
        <S.ButtonWrapper>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={startGame}
          >
            {gameState.status === 'RUNNING' ? 'Restart' : 'Start'}
          </Button>
        </S.ButtonWrapper>
      </S.GameWrapper>
    </S.GameContainer>
  )
}

export default Game
