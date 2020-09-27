import React, { useState, useEffect } from 'react'
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
  losses: number
  ties: number
}

const mediaQuery = '(min-width: 600px)'

const mql = window.matchMedia(mediaQuery)

interface WindowSize {
  width: number
  height: number
}
const mobileSize: WindowSize = {
  width: 350,
  height: 250
}

const desktopSize: WindowSize = {
  width: 600,
  height: 400
}

interface Props {
  data: DataPoint[]
}

const GameChart: React.FC<Props> = ({ data }) => {
  const [size, setSize] = useState<WindowSize>(() => {
    if (window.matchMedia(mediaQuery).matches) {
      return desktopSize
    }
    return mobileSize
  })
  useEffect(() => {
    mql.addListener((e) => {
      if (e.matches) {
        setSize(desktopSize)
      } else {
        setSize(mobileSize)
      }
    })
  }, [])
  return (
    <BarChart
      width={size.width}
      height={size.height}
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
      <Bar dataKey="losses" fill="#ff5555" />
      <Bar dataKey="ties" fill="#8be9fd" />
    </BarChart>
  )
}

export default GameChart
