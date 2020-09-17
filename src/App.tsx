import React, { useEffect } from 'react'
import Game from './components/Game'
import GameContext from './GameContext'
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark'

import GlobalStyle from './styles/global'
import Header from './components/Header'
import { Layout } from './components/Layout'
import ReactGa from 'react-ga'

const App = () => {
  useEffect(() => {
    ReactGa.initialize('UA-177946786-1')
    ReactGa.pageview('/')
  }, [])

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
