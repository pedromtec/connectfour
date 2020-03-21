import React from 'react'
import PropTypes from 'prop-types'
import './HeaderStatus.css'
// eslint-disable-next-line import/prefer-default-export
const HeaderStatus = props => {
  const { player, isWinner } = props
  const [playerName, status] =
    player === 1 ? ['Player One', 'status one'] : ['Player two', 'status two']
  if (isWinner) {
    return <h1 className={status}>{`${playerName} won!`}</h1>
  }
  return <h1 className={status}>{playerName}</h1>
}

HeaderStatus.propTypes = {
  player: PropTypes.number.isRequired,
  isWinner: PropTypes.bool.isRequired,
}

export default HeaderStatus
