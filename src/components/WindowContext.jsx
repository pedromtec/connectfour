import React, {createContext, useEffect, useContext} from 'react'
import { useState } from 'react';

export const WindowContext = createContext({});

const WindowContextProvider = ({children}) => {
  const [windowWidth, setWindowWidth] = useState(null)
  const [windowHeight, setWindowHeight] = useState(null)
  
  useEffect(() => {
    const listener = window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    })

    return () => window.removeEventListener('resize', listener)
  }, [])

  return (
    <WindowContext.Provider value={{windowWidth, windowHeight}}>
      {children}
    </WindowContext.Provider>
  )
}

const useWindowContext = () => {
  const context = useContext(WindowContext)
  if (context === undefined) {
    throw new Error(
      'useWindowContext must be used within a WindowContextProvider'
    )
  }
  return context
}

export default { WindowContextProvider, useWindowContext }