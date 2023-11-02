"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { usePreviousRoute } from '@hooks/prevRoute'
import { SessionContextValue, useSession } from 'next-auth/react'

interface AppProviderType {
  children: React.ReactNode
}

const AppContext = createContext({})

export const AppProvider = ({ children }: AppProviderType) => {
  const previousRoute = usePreviousRoute()
  const { data: session }: SessionContextValue = useSession()
  const [ prompts, setPrompts ] = useState([])

  useEffect(() => {
    if (!session) return
    (async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const prompts = await response.json()

      setPrompts(prompts)
    })();
  }, [ session ])

  return (<AppContext.Provider value={{ previousRoute, session }}>{ children }</AppContext.Provider>)
}

export const useAppProvider = (): any => {
  const context = useContext(AppContext)

  return context
}
