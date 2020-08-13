import React from 'react'
import './App.css'
import Game from './components/Game'
import WindowContext from './WindowContext'

const App = () => {
  return (
    <WindowContext.WindowContextProvider>
      <div className="App">
        <Game />
      </div>
    </WindowContext.WindowContextProvider>
  )
}
export default App
