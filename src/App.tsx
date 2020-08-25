import React from 'react'
import Game from './components/Game'
import WindowContext from './WindowContext'
import GameContext from './GameContext'
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark'

import GlobalStyle from './styles/global'
import Header from './components/Header'

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <WindowContext.WindowContextProvider>
        <GameContext.GameContextProvider>
          <div className="App">
            <GlobalStyle />
            <Header />
            <Game />
          </div>
        </GameContext.GameContextProvider>
      </WindowContext.WindowContextProvider>
    </ThemeProvider>
  )
}
export default App
