import React from 'react'
import './DropBar.css'
import { useContext } from 'react'
import { GameContext } from './Game'
import WindowContext from './WindowContext'

const { useWindowContext } = WindowContext 

const colors = {
  1: 'red',
  2: 'yellow',
}

const DropBar = ( {currentPlayer} ) => {

  const [positionX, setPositionX] = React.useState(0)
  const windowContext = useWindowContext()
  console.log({windowContext})
  
  const { dropPiece } = useContext(GameContext)

  const handleMouseMove = (e) => {
    e.persist()
    setPositionX(e.clientX)
  }


  const backgroundColor = colors[currentPlayer]
  
  const handleClick = () => {
    const boardWidth = positionX - 479 + 30
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