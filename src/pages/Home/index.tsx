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
          <S.FieldName>Sky Connect</S.FieldName>
          <S.FieldDescription>
            &quot;Learn to play Connect Four with Sky Connect Bot&ldquo;
          </S.FieldDescription>
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
          <S.FieldName>Alpha Star</S.FieldName>
          <S.FieldDescription>
            &quot;Are you looking for a challenge? Alpha Star can be a good
            choice&ldquo;
          </S.FieldDescription>
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
