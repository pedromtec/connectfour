import React from 'react'
import Disk from '../Disk'
import * as S from './styled'

interface Props {
  grid: number[][]
}

const Board: React.FC<Props> = ({ grid }) => (
  <S.Grid>
    {grid.map((row, indexRow) => (
      <S.Row key={indexRow}>
        {row.map((_, indexDisk) => (
          <Disk key={indexDisk} row={indexRow} column={indexDisk} />
        ))}
      </S.Row>
    ))}
  </S.Grid>
)

export default Board
