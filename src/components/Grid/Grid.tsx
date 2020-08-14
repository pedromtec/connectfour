import React, { FunctionComponent } from 'react'
import Disk from '../Disk/Disk'
import './Grid.css'

interface Props {
  grid: number[][]
}

const Grid: FunctionComponent<Props> = ({ grid }) => (
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

export default Grid
