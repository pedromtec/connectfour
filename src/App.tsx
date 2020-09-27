import React, { useEffect } from 'react'
import Game from './pages/Game'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from 'styled-components'
import dark from './styles/themes/dark'

import GlobalStyle from './styles/global'
import Header from './components/Header'
import { Layout } from './components/Layout'
import ReactGa from 'react-ga'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    ReactGa.initialize('UA-177946786-1')
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <ThemeProvider theme={dark}>
      <Layout>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/game" component={Game} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </ThemeProvider>
  )
}
export default App
