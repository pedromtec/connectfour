import React from 'react'
import Player from '../../assets/man.svg'
import Agent from '../../assets/agent.svg'
import RightArrow from '../../assets/right.svg'
import LeftArrow from '../../assets/left.svg'
import { BoardConfig } from '../../utils/board'
import * as S from './styled'

interface Props {
  player: number
}

const HeaderStatus: React.FC<Props> = ({ player }) => {
  const isAgentTurn = player === BoardConfig.AGENT

  return (
    <S.Container>
      <S.Wrapper>
        <S.AvatarContainer withColor={!isAgentTurn}>
          <img src={Player} width="50px" height="50px" alt="" />
        </S.AvatarContainer>
        {isAgentTurn ? (
          <img src={RightArrow} width="50px" height="50px" alt="" />
        ) : (
          <img src={LeftArrow} width="50px" height="50px" alt="" />
        )}
        <S.AvatarContainer withColor={isAgentTurn}>
          <img src={Agent} width="50px" height="50px" alt="" />
        </S.AvatarContainer>
      </S.Wrapper>
    </S.Container>
  )
}

export default HeaderStatus
