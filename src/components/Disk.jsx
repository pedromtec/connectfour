import React from 'react'
import PropTypes from 'prop-types'
import './Disk.css'

const Disk = ({ value, row, handleClick }) => {

  let color = 'empty'
  if (value === 1) {
    color = 'red'
  } else if (value === 2) {
    color = 'yellow'
  } else if (value === 3) {
    color = 'green'
  }
  
  const anymationStyle = `da${row}`

  return (
    <div className="cell" onClick={handleClick}>
      {value !== 0 ?
        <div className={anymationStyle}>
          <div className={color}></div>
        </div> :
        <div className={color}></div>
      }
    </div>
  )
}

Disk.propTypes = {
  value: PropTypes.number.isRequired,
}

export default Disk
