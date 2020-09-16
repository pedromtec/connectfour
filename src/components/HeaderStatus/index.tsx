import React from 'react'
import { BoardConfig } from '../../utils/board'
import * as S from './styled'
import Bot from '../../assets/bot.json'
import Human from '../../assets/human.json'
import Lottie from 'react-lottie'
import Loading from '../Loading'
interface Props {
  player: number
  isAgentProcessing: boolean
}

const HeaderStatus: React.FC<Props> = ({ player, isAgentProcessing }) => {
  const BotDefaultOptions = {
    loop: true,
    autoplay: false,
    animationData: Bot,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const HumanDefaultOptions = {
    loop: true,
    autoplay: false,
    animationData: Human,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <S.Container>
      <S.Wrapper>
        <S.AvatarContainer paddingBottom={true}>
          <Lottie
            options={HumanDefaultOptions}
            isStopped={player !== BoardConfig.PLAYER}
          />
        </S.AvatarContainer>
        {isAgentProcessing && <Loading message="loading..." />}
        <S.AvatarContainer paddingBottom={false}>
          <Lottie
            options={BotDefaultOptions}
            isStopped={player !== BoardConfig.AGENT}
          />
        </S.AvatarContainer>
      </S.Wrapper>
    </S.Container>
  )
}

export default HeaderStatus
