import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import dark from '../styles/themes/dark'

import GlobalStyle from '../styles/global'
import Header from '../components/Header'
import { Layout } from '../components/Layout'
import ReactGa from 'react-ga'
import NextNprogress from 'nextjs-progressbar'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    ReactGa.initialize('UA-177946786-1')
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <ThemeProvider theme={dark}>
      <Layout>
        <GlobalStyle />
        <NextNprogress
          color="#bd93f9"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </Layout>
    </ThemeProvider>
  )
}
export default MyApp
