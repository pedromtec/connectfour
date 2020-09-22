import React from 'react'
import Board from '../../components/Grid'
import { Button } from '@material-ui/core'
import * as S from './styled'
import GameContext from '../../GameContext'
import HeaderStatus from '../../components/HeaderStatus'
import Menu from '../../components/Menu'
const { useGameContext } = GameContext

const Game = () => {
  const { gameState, startGame, restartGame } = useGameContext()

  return (
    <S.GameContainer>
      {gameState.status === 'NOT_INITIALIZED' && (
        <Menu startGame={startGame} selectedBot={gameState.selectedBot} />
      )}
      <S.GameWrapper>
        <HeaderStatus
          player={gameState.currentPlayer}
          isAgentProcessing={gameState.isAgentProcessing}
          selectedBot={gameState.selectedBot}
          status={gameState.status}
        />

        <Board grid={gameState.board} />
        <S.ButtonWrapper>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={restartGame}
          >
            {gameState.status === 'FINISHED' ? 'New game' : 'Restart'}
          </Button>
        </S.ButtonWrapper>
      </S.GameWrapper>
    </S.GameContainer>
  )
}

interface Location {
  state?: { selectedBot: number }
}
interface Props {
  location: Location
}

const GameWithContext = (props: Props) => (
  <GameContext.GameContextProvider
    selectedBot={props.location.state?.selectedBot}
  >
    <Game />
  </GameContext.GameContextProvider>
)

export default GameWithContext
