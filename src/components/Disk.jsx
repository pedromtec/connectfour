import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'
import { GameContext } from '../components/Game'
import './Disk.css'

const colors = {
  1: 'red',
  2: 'yellow',
}

// const styles = {
//   '@keyframes drop': props => ({
//     from: {
//       transform: `translateY(${props.height}px);`
//     },
//     to: {
//       transform: 'translateY(0px);'
//     }
//   }),
//   animationContainer: props => ({
//     animationName: '$drop',
//     animationDuration: `${props.time}`
//   })
// }

const styles = {
  '@keyframes drop': {
    from: {
      transform: `translateY(-429px);`
    },
    to: {
      transform: 'translateY(0px);'
    }
  },
  animationContainer: props => ({
    animationName: '$drop',
    animationDuration: `${props.time}`
  })
}

const useStyles = createUseStyles(styles)

const animationProps = {
  0: { height: -70, time: '0.4s'},
  1: { height: -140, time: '0.5s'},
  2: { height: -210, time: '0.66s'},
  3: { height: -280, time: '0.83s'},
  4: { height: -350, time: '1s'},
  5: { height: -420, time: '1s'},
}

const Disk = ({ row, column }) => {

  const { dropPiece, state: {
    board
  } } = useContext(GameContext)


  const classes = useStyles(animationProps[row])
  
  const value = board[row][column]

  //const anymationStyle = `da${row}`

  return (
    <div className="cell" onClick={() => dropPiece(column)}>
      {value !== 0 ?
        <div className={classes.animationContainer}>
          <div className='disk' style={{
            backgroundColor: colors[value]
          }}></div>
        </div> :
        <div className='disk' style={{
          backgroundColor: colors[value]
        }}></div>
      }
    </div>
  )
}


export default Disk
