import React from 'react'
import { BoardInfo, BotInfo } from '../../utils/board'
import * as S from './styled'
import AlphaStar from '../../assets/bot.json'
import SkyConnect from '../../assets/bot2.json'
import Human from '../../assets/human.json'
import Lottie from 'react-lottie'
import Loading from '../Loading'
interface Props {
  player: number
  isAgentProcessing: boolean
  selectedBot: number
  status: string
}

const defaultOptions = {
  loop: true,
  autoplay: false,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const HeaderStatus: React.FC<Props> = ({
  player,
  isAgentProcessing,
  selectedBot,
  status
}) => {
  const isRunning = status === 'RUNNING'
  return (
    <S.Container>
      <S.Wrapper>
        <S.AvatarContainer paddingBottom={true}>
          <Lottie
            options={{ ...defaultOptions, animationData: Human }}
            isStopped={!isRunning || player !== BoardInfo.PLAYER}
          />
        </S.AvatarContainer>
        {isAgentProcessing && <Loading message="Pensando..." />}
        <S.AvatarContainer paddingBottom={false}>
          <Lottie
            options={{
              ...defaultOptions,
              animationData:
                selectedBot === BotInfo.MINIMAX ? SkyConnect : AlphaStar
            }}
            isStopped={!isRunning || player !== BoardInfo.BOT}
          />
        </S.AvatarContainer>
      </S.Wrapper>
    </S.Container>
  )
}

export default HeaderStatus
