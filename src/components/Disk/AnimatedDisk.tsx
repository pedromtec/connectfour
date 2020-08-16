import React, { FunctionComponent, useContext } from 'react'
import { useFriction } from 'renature';
import { GameContext } from '../Game'
import WindowContext from '../../WindowContext'
import { dropArgs, winnerArgs } from './animationArgs'
import Disk from './index'

const { useWindowContext } = WindowContext

const colors: Record<number, string> = {
  0: '',
  1: 'red',
  2: 'yellow',
}

const animationProps: Record<number, { height: number; mu: number }> = {
  5: { height: -70, mu: 1 },
  4: { height: -140, mu: 1 },
  3: { height: -210, mu: 1.2 },
  2: { height: -280, mu: 1.4 },
  1: { height: -350, mu: 1.4 },
  0: { height: -420, mu: 2.4 },
}

const getDiskColor = (hasWinner: boolean, currentPlayer: number, diskValue: number): string => {
  if (hasWinner && diskValue === 3) {
    return colors[currentPlayer]
  } else {
    return colors[diskValue]
  }
}

type AnimationType = 'DROP' | 'WINNER' | 'NONE'

const useAnimatedDisk = (animationType: AnimationType, verticalTranslate: number, row: number) => {
  const args = animationType === 'DROP' ?
    dropArgs(`translateY(${-verticalTranslate}px)`, animationProps[row].mu)
    : winnerArgs()

  const [props] = useFriction(args)

  return props
}

const AnimatedDisk: FunctionComponent<Props> = ({ row, column }) => {
  const gameContext = useContext(GameContext)

  const { dropPiece, gameState: {
    board, lastDrop, currentPlayer, hasWinner
  } } = gameContext!

  const { boardHeight } = useWindowContext()

  const verticalTranslate = boardHeight - (5 - row) * (boardHeight / 6)
  const isLastDrop = lastDrop && lastDrop.row === row && lastDrop.column === column
  const diskValue = board[row][column]

  const animationType: AnimationType =
    diskValue === 3 ? 'WINNER' :
      isLastDrop ? 'DROP' : 'NONE'

  const color = getDiskColor(hasWinner, currentPlayer, board[row][column])

  const animatedDisk = useAnimatedDisk(animationType, verticalTranslate, row)

  const animationProps = animationType === 'NONE' ? {} : animatedDisk

  return (
    <Disk color={color} animationProps={animationProps} handleClick={() => dropPiece(column)} />
  )
}

interface Props {
  row: number,
  column: number
}

export default AnimatedDisk

