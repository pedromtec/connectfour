import React, { useContext } from 'react'
import { GameContext } from '../components/Game'
import './Disk.css'

const colors = {
  1: 'red',
  2: 'yellow',
}

const Disk = ({ row, column }) => {

  const { dropPiece, state: {
    board
  } } = useContext(GameContext)

  const value = board[row][column]

  const anymationStyle = `da${row}`

  return (
    <div className="cell" onClick={() => dropPiece(column)}>
      {value !== 0 ?
        <div className={anymationStyle}>
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
