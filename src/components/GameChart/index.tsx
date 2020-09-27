import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

export interface DataPoint {
  name: string
  wins: number
  loses: number
  ties: number
}

interface Props {
  data: DataPoint[]
}

const GameChart: React.FC<Props> = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="wins" fill="#50fa7b" />
      <Bar dataKey="loses" fill="#ff5555" />
      <Bar dataKey="ties" fill="#8be9fd" />
    </BarChart>
  )
}

export default GameChart
