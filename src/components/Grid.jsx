import React from 'react'
import PropTypes from 'prop-types'
import Disk from './Disk'
import './Grid.css'

const Grid = ({ grid }) => (
  <div className="grid">
    {grid.map((row, indexRow) => (
      <div className="row" key={indexRow}>
        {row.map((disk, indexDisk) => (
          <Disk
            key={indexDisk}
            row={indexRow}
            column={indexDisk}
          />
        ))}
      </div>
    ))}
  </div>
)

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
}

export default Grid
