import React from 'react'
import Player from '../../assets/man.svg'
import { BoardConfig } from '../../utils/board'
import * as S from './styled'
import Bot from '../../assets/bot.json'
import Lottie from 'react-lottie'
interface Props {
  player: number
}

const HeaderStatus: React.FC<Props> = ({ player }) => {
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: Bot,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.AvatarContainer paddingBottom={true}>
          <S.Avatar src={Player} alt="Player avatar" />
        </S.AvatarContainer>

        <S.AvatarContainer paddingBottom={false}>
          <Lottie
            options={defaultOptions}
            isStopped={player === BoardConfig.PLAYER}
          />
        </S.AvatarContainer>
      </S.Wrapper>
    </S.Container>
  )
}

export default HeaderStatus
