import React from 'react'
import './App.css'
import Game from './components/Game'
import WindowContext from './WindowContext'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import usePersistedState from './hooks/usePersistedState'

import light from './styles/themes/light'
import dark from './styles/themes/dark'

import GlobalStyle from './styles/global'
import Header from './components/Header'

const App = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <ThemeProvider theme={theme}>
      <WindowContext.WindowContextProvider>
        <div className="App">
          <GlobalStyle />
          <Header toggleTheme={toggleTheme} />
          <Game />
        </div>
      </WindowContext.WindowContextProvider>
    </ThemeProvider>
  )
}
export default App
