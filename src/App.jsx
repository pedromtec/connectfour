import React from 'react'
import './App.css'
import Game from './components/Game'

const App = () => {
  return (
    <div className="App">
      <Game initialPlayer={1} />
    </div>
  )
}
export default App
