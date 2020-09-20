import React from 'react'
import * as S from './styled'

export type AnimationType = 'WINNER' | 'DROP' | 'NONE'

const Disk: React.FC<Props> = ({
  color,
  handleClick,
  animationType,
  time,
  height
}) => {
  return (
    <S.DiskWrapper>
      {animationType === 'WINNER' && (
        <S.WinnerDisk diskColor={color} onClick={handleClick} />
      )}

      {animationType === 'NONE' && (
        <S.Disk diskColor={color} onClick={handleClick} />
      )}

      {animationType === 'DROP' && (
        <S.DropDisk
          diskColor={color}
          onClick={handleClick}
          time={time}
          height={height}
        />
      )}
    </S.DiskWrapper>
  )
}

interface Props {
  color: string
  handleClick: () => void
  animationType: AnimationType
  time?: string
  height?: number
}

export default React.memo(Disk)
