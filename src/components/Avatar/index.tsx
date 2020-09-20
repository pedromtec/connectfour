import React from 'react'
import Lottie from 'react-lottie'
import { BotInfo } from '../../utils/board'
import Bot from '../../assets/bot.json'
import Bot2 from '../../assets/bot2.json'
import * as S from './styled'

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

interface Props {
  bot: number
  withAnimation: boolean
}

const Avatar: React.FC<Props> = ({ bot, withAnimation }) => {
  const animationData = bot === BotInfo.MINIMAX ? Bot2 : Bot
  return (
    <S.AvatarContainer>
      <Lottie
        options={{ ...defaultOptions, animationData }}
        isStopped={!withAnimation}
      />
    </S.AvatarContainer>
  )
}

export default Avatar
