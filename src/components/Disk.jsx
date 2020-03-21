/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import PropTypes from 'prop-types'
import './Disk.css'

const Disk = ({ disk, handleClick }) => {
  let style = 'disk '
  if (disk === 1) {
    style += 'playerOne'
  } else if (disk === 2) {
    style += 'playerTwo'
  } else if (disk === 0) {
    style += 'empty'
  } else {
    style += 'playerWinner'
  }
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={handleClick} className={style} />
  )
}

Disk.propTypes = {
  disk: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Disk
