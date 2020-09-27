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

const data = [
  {
    name: 'Easy',
    wins: 4000,
    loses: 2400,
    ties: 2400
  },
  {
    name: 'Medium',
    wins: 3000,
    loses: 1398,
    ties: 2210
  },
  {
    name: 'Hard',
    wins: 4000,
    loses: 2400,
    ties: 2400
  }
]

const GameBarChart: React.FC = () => {
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

export default GameBarChart
