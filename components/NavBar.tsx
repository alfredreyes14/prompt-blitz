"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, SessionContextValue, LiteralUnion, ClientSafeProvider } from 'next-auth/react'

import DesktopNav from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'
import { BuiltInProviderType } from 'next-auth/providers'

const NavBar = (): React.ReactNode => {
  const { data: session }: SessionContextValue = useSession()
  const [ isMounted, setIsMounted ]: [boolean, Function] = useState(false)
  const [ providers, setProviders ]: [any, Function] = useState(null)

  useEffect(() => {
    (async () => {
      const response: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders()

      setProviders(response)
    })();

    setIsMounted(true)
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link 
        href="/" 
        className="flex gap-2 flex-center"
      >
        <Image 
          alt="logo" 
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className="logo_text">Promptopia</p>

        { isMounted && (
            <>
                <DesktopNav 
                  session={session}
                  providers={providers}
                  signIn={signIn}
                />
                <MobileNavigation
                  session={session}
                  providers={providers}
                  signIn={signIn}
                  signOut={signOut}
                />
            </>
          )
        }
      </Link>
    </nav>
  )
}

export default NavBar