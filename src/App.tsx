import React from 'react'
import Game from './components/Game'
import GameContext from './GameContext'
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark'

import GlobalStyle from './styles/global'
import Header from './components/Header'
import { Layout } from './components/Layout'

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <GameContext.GameContextProvider>
        <Layout>
          <GlobalStyle />
          <Header />
          <Game />
        </Layout>
      </GameContext.GameContextProvider>
    </ThemeProvider>
  )
}
export default App
