import React, { useContext, FunctionComponent } from 'react'
import { useFriction } from 'renature';
import { GameContext } from '../Game'
import WindowContext from '../../WindowContext'
import './Disk.css'


const { useWindowContext } = WindowContext

const colors: Record<number, string> = {
  0: '',
  1: 'red',
  2: 'yellow',
}

const animationProps: Record<number, { height: number; mu: number } > = {
  5: { height: -70, mu: 1},
  4: { height: -140, mu: 1},
  3: { height: -210, mu: 1.2},
  2: { height: -280, mu: 1.4},
  1: { height: -350, mu: 1.4},
  0: { height: -420, mu: 2.4},
}

const WinnerDisk = ({color}: {color: string}) => {
  const [props] = useFriction({
    from: {
      transform: 'scale(0.5) rotate(0deg)',
      borderRadius: '100%',
    },
    to: {
      transform: 'scale(1.2) rotate(360deg)',
      background: 'steelblue',
      borderRadius: '50%',
    },
    config: {
      mu: 0.2,
      mass: 20,
      initialVelocity: 2,
    },
    infinite: true,
  });

  return (
    <div className='disk' style={{
      backgroundColor: color
    }} {...props} />
  )
}

const AnimatedDisk = ({row, color, verticalTranslate}: {row: number; color: string; verticalTranslate: number}) => {

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
      backgroundColor: color
    }} {...props} />
  )
}



const getDiskColor = (hasWinner: boolean, currentPlayer: number, diskValue: number): any => {
  if(hasWinner && diskValue === 3) {
    return colors[currentPlayer]
  }else {
    return colors[diskValue]
  }
}

interface Props {
  row: number,
  column: number
}
const Disk: FunctionComponent<Props> = ({ row, column }) => {

  const { dropPiece, gameState: {
    board, lastDrop, currentPlayer, hasWinner
  } } = useContext(GameContext)!
  
  const { boardHeight } = useWindowContext()
  // console.log({boardHeight})
  const verticalTranslate = boardHeight - (5 - row) * (boardHeight / 6)
  
  const withAnimation = lastDrop && lastDrop.row === row && lastDrop.column === column
  const color = getDiskColor(hasWinner, currentPlayer, board[row][column])

  if(board[row][column] === 3) {
    return (
      <div className="cell" onClick={() => dropPiece(column)}>
        <WinnerDisk color={color}/>
      </div>
    )
  }

  return (
    <div className="cell" onClick={() => dropPiece(column)}>
      {
        withAnimation ?
          <AnimatedDisk row={row} color={color} verticalTranslate={verticalTranslate} /> :
          <div className='disk' style={{
            backgroundColor: color
          }} />
      }
    </div>
  )
}


export default Disk
