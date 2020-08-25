import React from 'react'
import { useFriction } from 'renature'
import { dropArgs, winnerArgs } from './animationArgs'
import * as S from './styled'

const animationProps: Record<number, { height: number; mu: number }> = {
  5: { height: -70, mu: 1 },
  4: { height: -140, mu: 1 },
  3: { height: -210, mu: 1.2 },
  2: { height: -280, mu: 1.4 },
  1: { height: -350, mu: 1.4 },
  0: { height: -420, mu: 2.4 }
}

type AnimationType = 'DROP' | 'WINNER' | 'NONE'

const useAnimatedDisk = (
  animationType: AnimationType,
  verticalTranslate: number,
  row: number
) => {
  const args =
    animationType === 'DROP'
      ? dropArgs(`translateY(${-verticalTranslate}px)`, animationProps[row].mu)
      : winnerArgs()
  const [props] = useFriction(args)

  return props
}

const AnimatedDisk: React.FC<Props> = ({
  color,
  handleClick,
  animationType,
  verticalTranslate,
  row
}) => {
  const animatedDisk = useAnimatedDisk(animationType, verticalTranslate, row)
  return (
    <S.DiskWrapper>
      <S.Disk diskColor={color} onClick={handleClick} {...animatedDisk} />
    </S.DiskWrapper>
  )
}

interface Props {
  color: string
  handleClick: () => void
  animationType: AnimationType
  verticalTranslate: number
  row: number
}

export default React.memo(AnimatedDisk)
