import React from 'react'
import Player from '../../assets/man.svg'
import Agent from '../../assets/agent.svg'
import { BoardConfig } from '../../utils/board'
import * as S from './styled'

interface Props {
  player: number
}

const HeaderStatus: React.FC<Props> = ({ player }) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.AvatarContainer withColor={player === BoardConfig.PLAYER}>
          <S.Avatar src={Player} alt="Player avatar" />
        </S.AvatarContainer>
        <S.AvatarContainer withColor={player === BoardConfig.AGENT}>
          <S.Avatar src={Agent} alt="Bot avatar" />
        </S.AvatarContainer>
      </S.Wrapper>
    </S.Container>
  )
}

export default HeaderStatus
