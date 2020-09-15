import React, { useContext, useMemo } from 'react'
import { GameContext } from '../../GameContext'
import Disk, { AnimationType } from './Disk'

const colors: Record<number, string> = {
  1: '#8be9fd',
  2: '#f1fa8c'
}

const getDiskColor = (
  hasWinner: boolean,
  currentPlayer: number,
  diskValue: number
): string => {
  if (hasWinner && diskValue === 3) {
    return colors[currentPlayer]
  } else {
    return colors[diskValue]
  }
}

interface AnimationProp {
  height: number
  time: string
}

const animationProps: Record<number, AnimationProp> = {
  0: { height: -70, time: '0.4s' },
  1: { height: -140, time: '0.5s' },
  2: { height: -210, time: '0.66s' },
  3: { height: -280, time: '0.83s' },
  4: { height: -350, time: '1s' },
  5: { height: -420, time: '1s' }
}

const Index: React.FC<Props> = ({ row, column }) => {
  const gameContext = useContext(GameContext)

  const {
    dropPiece,
    gameState: { board, currentPlayer, hasWinner, lastDrop }
  } = gameContext!

  const diskValue = board[row][column]

  const color = useMemo(
    () => getDiskColor(hasWinner, currentPlayer, diskValue),
    [hasWinner, currentPlayer, diskValue]
  )

  const animationType: AnimationType =
    diskValue === 3
      ? 'WINNER'
      : lastDrop?.row === row && lastDrop.column === column
      ? 'DROP'
      : 'NONE'
  const animationProp: AnimationProp = animationProps[row]

  return (
    <Disk
      color={color}
      handleClick={() => dropPiece(column)}
      animationType={animationType}
      height={animationProp.height}
      time={animationProp.time}
    />
  )
}

interface Props {
  row: number
  column: number
}

export default Index
