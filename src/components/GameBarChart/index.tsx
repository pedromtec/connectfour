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

export type DataPoint = {
  name: string
  wins: number
  loses: number
  ties: number
}

type GameBarChartProps = {
  data: DataPoint[]
}

const GameBarChart = ({ data }: GameBarChartProps) => {
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 50
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

export default GameBarChart
