import React, { useContext } from 'react'
import { GameContext } from '../../GameContext'
import WindowContext from '../../WindowContext'
import Disk from './Disk'
import AnimatedDisk from './AnimatedDisk'

const { useWindowContext } = WindowContext

const colors: Record<number, string> = {
  1: '#8be9fd',
  2: '#f1fa8c'
}

type AnimationType = 'DROP' | 'WINNER' | 'NONE'

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

const Index: React.FC<Props> = ({ row, column }) => {
  const gameContext = useContext(GameContext)

  const {
    dropPiece,
    gameState: { board, lastDrop, currentPlayer, hasWinner }
  } = gameContext!

  const { boardHeight } = useWindowContext()

  const verticalTranslate = boardHeight - (5 - row) * (boardHeight / 6)

  const isLastDrop =
    lastDrop && lastDrop.row === row && lastDrop.column === column
  const diskValue = board[row][column]

  const animationType: AnimationType =
    diskValue === 3 ? 'WINNER' : isLastDrop ? 'DROP' : 'NONE'

  const color = getDiskColor(hasWinner, currentPlayer, diskValue)

  return animationType === 'NONE' ? (
    <Disk color={color} handleClick={() => dropPiece(column)} />
  ) : (
    <AnimatedDisk
      color={color}
      handleClick={() => dropPiece(column)}
      row={row}
      verticalTranslate={verticalTranslate}
      animationType={animationType}
    />
  )
}

interface Props {
  row: number
  column: number
}

export default Index
