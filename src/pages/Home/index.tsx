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
            Learn to play Connect Four with <i>Sky Connect</i>.
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
            Are you looking for a challenge? <i>Alpha Star</i> is the right
            choice.
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
