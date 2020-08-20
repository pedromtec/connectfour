import React from 'react'
import './App.css'
import Game from './components/Game'
import WindowContext from './WindowContext'
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark'

import GlobalStyle from './styles/global'
import Header from './components/Header'

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <WindowContext.WindowContextProvider>
        <div className="App">
          <GlobalStyle />
          <Header />
          <Game />
        </div>
      </WindowContext.WindowContextProvider>
    </ThemeProvider>
  )
}
export default App
