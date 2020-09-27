import React, { useState, useEffect } from 'react'
import { matchesRef } from '../../firebase'
import BarChart from '../../components/BarChart'
import * as S from './styled'

const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<any | null>(null)
  useEffect(() => {
    matchesRef.on('value', (snapshot) => {
      const items = snapshot.val()
      setMatches(Object.keys(items).map((key) => items[key]))
    })
  }, [])
  console.log({ matches })
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Sky Connect</S.Title>
        <BarChart />
      </S.Wrapper>
      <S.Wrapper>
        <S.Title>Alpha Star</S.Title>
        <BarChart />
      </S.Wrapper>
    </S.Container>
  )
}

export default Dashboard
