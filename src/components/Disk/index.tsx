import React, { useContext, useMemo } from 'react'
import { GameContext } from '../../GameContext'
import Disk from './Disk'

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

const Index: React.FC<Props> = ({ row, column }) => {
  const gameContext = useContext(GameContext)

  const {
    dropPiece,
    gameState: { board, currentPlayer, hasWinner }
  } = gameContext!

  const diskValue = board[row][column]

  const color = useMemo(
    () => getDiskColor(hasWinner, currentPlayer, diskValue),
    [hasWinner, currentPlayer, diskValue]
  )

  return <Disk color={color} handleClick={() => dropPiece(column)} />
}

interface Props {
  row: number
  column: number
}

export default Index
