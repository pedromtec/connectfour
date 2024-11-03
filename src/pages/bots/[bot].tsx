import React from 'react'
import Board from '../../components/Grid'
import { Button } from '@material-ui/core'
import GameContext from '../../contexts/GameContext'
import HeaderStatus from '../../components/HeaderStatus'
import Menu from '../../components/Menu'

import styled from 'styled-components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { BotInfo } from '../../utils/board'
import { NextSeo } from 'next-seo'

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
`
export const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`

export const SpinnerWrapper = styled.div`
  padding-bottom: 5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const { useGameContext } = GameContext

const Game = () => {
  const { gameState, startGame, restartGame } = useGameContext()

  return (
    <>
      <NextSeo
        title="Connect 4 - Você vs IA"
        description="Desafie-se em uma partida de Connect 4 online! Encare o tabuleiro e teste suas habilidades de estratégia agora mesmo. Escolha o nível de dificuldade e divirta-se."
      />
      <GameContainer>
        {gameState.status === 'NOT_INITIALIZED' && (
          <Menu startGame={startGame} selectedBot={gameState.selectedBot} />
        )}
        <GameWrapper>
          <HeaderStatus
            player={gameState.currentPlayer}
            isAgentProcessing={gameState.isAgentProcessing}
            selectedBot={gameState.selectedBot}
            status={gameState.status}
          />

          <Board grid={gameState.board} />
          <ButtonWrapper>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              onClick={restartGame}
            >
              {gameState.status === 'FINISHED' ? 'Novo jogo' : 'Recomeçar'}
            </Button>
          </ButtonWrapper>
        </GameWrapper>
      </GameContainer>
    </>
  )
}

type GameWithContextProps = {
  bot: number
}

const GameWithContext = (props: GameWithContextProps) => (
  <GameContext.GameContextProvider selectedBot={props.bot}>
    <Game />
  </GameContext.GameContextProvider>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [BotInfo.MINIMAX, BotInfo.ALPHA_BETA].map((bot) => ({
    params: {
      bot: `${bot}`
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { bot } = ctx.params
  return {
    props: {
      bot: Number(bot)
    }
  }
}

export default GameWithContext
