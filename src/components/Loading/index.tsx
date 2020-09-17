import React from 'react'
import * as S from './styled'

interface Props {
  message?: string
}

const Loading: React.FC<Props> = ({ message = 'Loading...' }) => (
  <S.Wrapper>
    {message.split('').map((character: string, index: number) => (
      <S.Character key={index} delay={index}>
        {character}
      </S.Character>
    ))}
  </S.Wrapper>
)

export default Loading
