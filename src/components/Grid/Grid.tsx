import React from 'react'
import Disk from '../Disk'
import './Grid.css'

interface Props {
  grid: number[][]
}

const Grid: React.FC<Props> = ({ grid }) => (
  <div className="grid">
    {grid.map((row, indexRow) => (
      <div className="row" key={indexRow}>
        {row.map((_, indexDisk) => (
          <Disk key={indexDisk} row={indexRow} column={indexDisk} />
        ))}
      </div>
    ))}
  </div>
)

export default Grid
