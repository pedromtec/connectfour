import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import dark from '../styles/themes/dark'

import GlobalStyle from '../styles/global'
import Header from '../components/Header'
import { Layout } from '../components/Layout'
import ReactGa from 'react-ga'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    ReactGa.initialize('UA-177946786-1')
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <ThemeProvider theme={dark}>
      <Layout>
        <GlobalStyle />
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </Layout>
    </ThemeProvider>
  )
}
export default MyApp
