import React, { useState, useEffect } from 'react'
import { matchesRef } from '../../firebase'
const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<number | null>(null)
  const [botWins, setBotWins] = useState<number | null>(null)
  useEffect(() => {
    matchesRef.on('value', (snapshot) => {
      const items = snapshot.val()
      let newCount = 0
      let newBotWins = 0
      for (const item in items) {
        newCount++
        if (items[item].status === 2) {
          newBotWins++
        }
      }
      console.log({ newCount })
      setMatches(newCount)
      setBotWins(newBotWins)
    })
  }, [])
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '8rem',
        paddingLeft: '8rem'
      }}
    >
      <h1>Matches: {matches}</h1>
      <h1>Bot Wins: {botWins}</h1>
    </div>
  )
}

export default Dashboard
