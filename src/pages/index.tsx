import React from 'react'
import Avatar from '../components/Avatar'
import { BotInfo } from '../utils/board'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100vh;
  padding-right: 2rem;
  padding-left: 2rem;
  @media (min-width: 600px) {
    padding-right: 13rem;
    padding-left: 13rem;
    max-width: 90rem;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
export const FieldName = styled.span`
  text-align: center;
  padding-bottom: 1rem;
  font-size: 1rem;
`
export const FieldDescription = styled.span`
  text-align: center;
  padding-bottom: 1rem;
  font-size: 0.75rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`
export const InfoContainer = styled.div`
  border-radius: 0.5rem;
  background-color: #44475a;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  max-width: 250px;
`

const Home: React.FC = () => {
  const router = useRouter()

  const handleHistory = (selectedBot: number) => {
    router.push(`/bots/${selectedBot}`)
  }

  return (
    <>
      <NextSeo
        title="Connect 4 - Desafie-se contra a IA em Diferentes Níveis de Dificuldade"
        description="Jogue Connect 4 online grátis. Enfrente uma IA fácil ou difícil e desafie-se neste clássico jogo de estratégia."
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'connect 4, Connect 4 online, jogo Connect 4, jogo de estratégia, jogo da velha, jogar Connect 4 grátis, jogo de tabuleiro, connect four play online'
          }
        ]}
        openGraph={{
          title: 'Jogue Connect 4 Online - Escolha Nível de Dificuldade',
          description:
            'Jogue Connect 4 online e escolha seu desafio! Enfrente uma IA fácil ou difícil neste clássico jogo de estratégia.',
          type: 'website',
          url: 'https://www.connect4-game.com/',
          images: [
            {
              url: '/game.png',
              width: 800,
              height: 600,
              alt: 'Tabuleiro de Connect 4'
            }
          ]
        }}
      />
      <Container>
        <Wrapper>
          <InfoContainer>
            <Avatar bot={BotInfo.MINIMAX} withAnimation={true} />
            <FieldName>Sky Connect</FieldName>
            <FieldDescription>
              Aprenda a jogar Connect 4 com <i>Sky Connect</i>.
            </FieldDescription>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              onClick={() => handleHistory(BotInfo.MINIMAX)}
            >
              Jogar
            </Button>
          </InfoContainer>
          <InfoContainer>
            <Avatar bot={BotInfo.ALPHA_BETA} withAnimation={true} />
            <FieldName>Alpha Star</FieldName>
            <FieldDescription>
              Está procurando um desafio? <i>Alpha Star</i> é a escolha certa.
            </FieldDescription>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              onClick={() => handleHistory(BotInfo.ALPHA_BETA)}
            >
              Jogar
            </Button>
          </InfoContainer>
        </Wrapper>
      </Container>
    </>
  )
}

export default Home
