import React from 'react'
import * as S from './styled'
import Avatar from '../../components/Avatar'
import { BotInfo } from '../../utils/board'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Home: React.FC = () => {
  const history = useHistory()

  const handleHistory = (selectedBot: number) => {
    history.push('/game', { selectedBot })
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.InfoContainer>
          <Avatar bot={BotInfo.MINIMAX} withAnimation={true} />
          <S.FieldMessage>Sky Connect</S.FieldMessage>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={() => handleHistory(BotInfo.MINIMAX)}
          >
            Play
          </Button>
        </S.InfoContainer>
        <S.InfoContainer>
          <Avatar bot={BotInfo.ALPHA_BETA} withAnimation={true} />
          <S.FieldMessage>Alpha Star</S.FieldMessage>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={() => handleHistory(BotInfo.ALPHA_BETA)}
          >
            Play
          </Button>
        </S.InfoContainer>
      </S.Wrapper>
    </S.Container>
  )
}

export default Home
