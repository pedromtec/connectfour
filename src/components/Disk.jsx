import React, { useContext } from 'react'
import { useFriction } from 'renature';
import { GameContext } from '../components/Game'
import './Disk.css'

const colors = {
  1: 'red',
  2: 'yellow',
}

const animationProps = {
  5: { height: -70, mu: 1},
  4: { height: -140, mu: 1},
  3: { height: -210, mu: 1.2},
  2: { height: -280, mu: 1.4},
  1: { height: -350, mu: 1.4},
  0: { height: -420, mu: 2.4},
}

const HEIGHT = 429

const AnimatedDisk = ({row, value, verticalTranslate}) => {

  const { mu } = animationProps[row]

  const [props] = useFriction({
    from: {
      transform: `translateY(${-verticalTranslate}px)`,
    },
    to: {
      transform: 'translateY(0px)',
    },
    config: {
      mu,
      mass: 0.8,
      initialVelocity: 8,
    }
  })

  return (
    <div className='disk' style={{
      backgroundColor: colors[value]
    }} {...props} />
  )
}

const Disk = ({ row, column }) => {

  const { state: {
    board, lastDrop
  } } = useContext(GameContext)

  const top = HEIGHT - (5 - row) * 70
  const withAnimation = lastDrop && lastDrop.row === row && lastDrop.col === column
  const value = board[row][column]

  return (
    <div className="cell" onClick={() => {}}>
      {
        withAnimation ?
          <AnimatedDisk row={row} value={value} verticalTranslate={top} /> :
          <div className='disk' style={{
            backgroundColor: colors[value]
          }}></div>
      }
    </div>
  )
}


export default Disk
