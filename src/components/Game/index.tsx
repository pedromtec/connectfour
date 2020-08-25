import React from 'react'
import Board from '../Grid'
import Button from '@material-ui/core/Button'
import * as S from './styled'
import GameContext from '../../GameContext'

const { useGameContext } = GameContext

const Game = () => {
  const { gameState, startGame } = useGameContext()

  return (
    <S.GameContainer>
      <S.GameWrapper>
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
