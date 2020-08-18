import React from 'react'
import * as S from './styled'

const Disk: React.FC<Props> = ({ color, handleClick }) => {
  return (
    <S.DiskWrapper>
      <S.Disk diskColor={color} onClick={handleClick} />
    </S.DiskWrapper>
  )
}

interface Props {
  color: string
  handleClick: () => void
}

export default React.memo(Disk)
