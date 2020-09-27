import React, { useState, useEffect } from 'react'
import * as S from './styled'
import { matchesRef } from '../../firebase'
import BarChart, { DataPoint } from '../../components/GameChart'
import { BotInfo, BotLevels } from '../../utils/board'

const getBotData = (botType: number, metrics: Metric[]): DataPoint[] => {
  const levels = BotLevels[botType]
  const countDataPoints: Record<string, DataPoint> = {}
  for (const metric of metrics) {
    if (metric.botType !== botType) {
      continue
    }
    const level = levels.find((level) => level.depth === metric.depth)
    if (!level) continue
    if (!countDataPoints[level.label]) {
      countDataPoints[level.label] = {
        loses: 0,
        wins: 0,
        ties: 0,
        name: level.label
      }
    }
    if (metric.status === 0) countDataPoints[level.label].ties++
    else if (metric.status === 1) countDataPoints[level.label].loses++
    else countDataPoints[level.label].wins++
  }
  return [
    countDataPoints['Easy'],
    countDataPoints['Medium'],
    countDataPoints['Hard']
  ]
}

interface Metric {
  botType: number
  status: number
  drops: number
  depth: number
}

const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<Metric[] | null>(null)
  useEffect(() => {
    matchesRef.on('value', (snapshot) => {
      const items = snapshot.val()
      setMatches(Object.keys(items).map((key) => items[key]))
    })
  }, [])
  console.log(matches?.length)
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Sky Connect</S.Title>
        <BarChart data={getBotData(BotInfo.MINIMAX, matches ?? [])} />
      </S.Wrapper>
      <S.Wrapper>
        <S.Title>Alpha Star</S.Title>
        <BarChart data={getBotData(BotInfo.ALPHA_BETA, matches ?? [])} />
      </S.Wrapper>
    </S.Container>
  )
}

export default Dashboard
