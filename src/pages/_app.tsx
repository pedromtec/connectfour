import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import dark from '../styles/themes/dark'

import GlobalStyle from '../styles/global'
import Header from '../components/Header'
import { Layout } from '../components/Layout'
import ReactGa from 'react-ga'
import NextNprogress from 'nextjs-progressbar'
import Head from 'next/head'

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
        <Head>
          <title>Connect four game</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/img/icon-192.png" />
          <link rel="shortcut icon" href="/img/icon-192.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content="Connect Four game" />
          <meta name="theme-color" />
        </Head>
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </Layout>
    </ThemeProvider>
  )
}
export default MyApp
