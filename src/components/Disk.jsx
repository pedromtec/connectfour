import React from 'react'
import PropTypes from 'prop-types'
import './Disk.css'
import withAnimation from './withAnimation'

const Disk = ({ value, handleClick }) => {

  let color = 'white'
  if(value === 1) {
    color = 'red'
  } else if(value === 2){
    color = 'yellow'
  } else if(value === 3) {
    color = 'green'
  }

  return (
    <div className={color}></div>
  )
}

Disk.propTypes = {
  value: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default withAnimation(Disk)
