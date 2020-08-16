import React, { FunctionComponent } from 'react'
import AnimatedDisk from '../Disk/AnimatedDisk'
import './Grid.css'

interface Props {
  grid: number[][]
}

const Grid: FunctionComponent<Props> = ({ grid }) => (
  <div className="grid">
    {grid.map((row, indexRow) => (
      <div className="row" key={indexRow}>
        {row.map((_, indexDisk) => (
          <AnimatedDisk
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
