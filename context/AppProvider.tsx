"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { usePreviousRoute } from '@hooks/prevRoute'
import { SessionContextValue, useSession } from 'next-auth/react'
import { usePromptActions } from '@hooks/promptActions'

interface AppProviderType {
  children: React.ReactNode
}

export const AppContext = createContext({})

export const AppProvider = ({ children }: AppProviderType) => {
  const previousRoute = usePreviousRoute()
  const { data: session }: SessionContextValue = useSession()
  const [ prompts, setPrompts ] = useState([])
  const [ isDoneFetchingPrompts, setIsDoneFetchingPrompts ] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/prompt`)
      const prompts = await response.json()

      setPrompts(prompts)
      setIsDoneFetchingPrompts(true)
    })();
  }, [])

  return (
    <AppContext.Provider 
      value={{
        previousRoute, 
        session,
        prompts,
        isDoneFetchingPrompts,
        setIsDoneFetchingPrompts
      }}
    >
        { children }
      </AppContext.Provider>
  )
}

export const useAppProvider = (): any => {
  const context = useContext(AppContext)

  return context
}
