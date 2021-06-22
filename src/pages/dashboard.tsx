import styled from 'styled-components'
import React from 'react'

import GameBarChart from '../components/GameBarChart'
import type { DataPoint } from '../components/GameBarChart'
import botResults from '../data/bot-results.json'

import { BotInfo, BotLevels } from '../utils/board'
import { GetStaticProps } from 'next'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h2`
  padding-bottom: 1rem;
  text-align: center;
  padding-bottom: 1rem;
  font-size: 1rem;
`

const getBotData = (botType: number, metrics: Metric[]): DataPoint[] => {
  const levels = BotLevels[botType]
  const countDataPoints: Record<string, DataPoint> = {}
  const botMetrics = metrics.filter((metric) => metric.botType === botType)

  for (const metric of botMetrics) {
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
type DashboardProps = {
  minimaxData: DataPoint[]
  alphaBetaData: DataPoint[]
}

const Dashboard = ({ minimaxData, alphaBetaData }: DashboardProps) => {
  return (
    <Container>
      <Wrapper>
        <Title>Sky Connect</Title>
        <GameBarChart data={minimaxData} />
      </Wrapper>
      <Wrapper>
        <Title>Alpha Star</Title>
        <GameBarChart data={alphaBetaData} />
      </Wrapper>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const items = botResults.results
  const matches = Object.keys(botResults.results).map((key) => items[key])

  const minimaxData = getBotData(BotInfo.MINIMAX, matches ?? [])
  const alphaBetaData = getBotData(BotInfo.ALPHA_BETA, matches ?? [])

  return {
    props: {
      minimaxData,
      alphaBetaData
    }
  }
}

export default Dashboard
