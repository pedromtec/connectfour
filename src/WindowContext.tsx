import React, {createContext, useEffect, useContext, ReactNode, FunctionComponent} from 'react'
import { useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';

interface Context {
  boardHeight: number
}

export const WindowContext = createContext<Context | undefined>(undefined);

const MOBILE_HEIGHT = 300
const DESKTOP_HEIGHT = 420

interface WindowContextProps {
  children: ReactNode
}


const WindowContextProvider: FunctionComponent<WindowContextProps> = ({children}) => {

  const [boardHeight, setBoardHeight] = useState(DESKTOP_HEIGHT)  

  const updateBoardHeight = useCallback(() => {
    if(boardHeight === MOBILE_HEIGHT && window.innerWidth >= 600) {
      setBoardHeight(DESKTOP_HEIGHT)
    }
    if(boardHeight === DESKTOP_HEIGHT && window.innerWidth < 600) {
      setBoardHeight(MOBILE_HEIGHT)
    }
  }, [boardHeight])

  useEffect(function initContextProvider() {
    updateBoardHeight()
  }, [updateBoardHeight])

  useEffect(function resizeListener() {
    window.addEventListener('resize', updateBoardHeight)
    return () => window.removeEventListener('resize', updateBoardHeight)
  }, [updateBoardHeight])



  const value = useMemo(() => ({boardHeight}), [boardHeight])
 
  return (
    <WindowContext.Provider value={value}>
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