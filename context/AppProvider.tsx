"use client"

import { createContext, useContext } from 'react'
import { usePreviousRoute } from '@hooks/prevRoute'

interface AppProviderType {
  children: React.ReactNode
}

const AppContext = createContext({})

export const AppProvider = ({ children }: AppProviderType) => {
  const previousRoute = usePreviousRoute()
  return (<AppContext.Provider value={{ previousRoute }}>{ children }</AppContext.Provider>)
}

export const useAppProvider = (): any => {
  const context = useContext(AppContext)

  return context
}
