import React from 'react'
import './DropBar.css'
import { useContext } from 'react'
import { GameContext } from './Game'

const colors = {
  1: 'red',
  2: 'yellow',
}

const DropBar = ( {currentPlayer} ) => {

  const [positionX, setPositionX] = React.useState(0)

  const { dropPiece } = useContext(GameContext)

  const handleMouseMove = (e) => {
    setPositionX(e.clientX)
  }


  const backgroundColor = colors[currentPlayer]
  
  const handleClick = (e) => {
    const boardWidth = e.clientX - 479 + 30
    const column = Math.floor(boardWidth / 70)
    dropPiece(column)
  }

  return (
    <div className="dropBar" onClick={handleClick} onMouseMove={handleMouseMove}> 
      <div className="dropDisk" style={positionX ? {left: `${positionX}px`, position: "absolute", backgroundColor} : {backgroundColor}} />
    </div>
  )
}

export default DropBar