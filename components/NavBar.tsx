"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, SessionContextValue, LiteralUnion, ClientSafeProvider } from 'next-auth/react'

import { BuiltInProviderType } from 'next-auth/providers'
import NavCTA from './NavCTA'
import { RoundSkeleton } from './Skeleton'

const NavBar = (): React.ReactNode => {
  const { data: session }: SessionContextValue = useSession()
  const [ providers, setProviders ]: [any, Function] = useState(null)

  useEffect(() => {
    (async () => {
      const response: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null = await getProviders()

      setProviders(response)
    })();

  }, [])

  return (
    <nav className='nav-style flex justify-between sticky top-0 z-50 w-full mb-16 pt-3 pb-4'>
        <Link 
          href="/" 
          className="flex gap-3 sm:px-5 md:px-10 lg:px-20"
        >
          <Image 
            alt="logo" 
            src="/assets/images/logo.svg"
            width={30}
            height={30}
            className='object-contain'
          />
          <p className="logo_text">PromptBlitz</p>
        </Link>
        <div className="cursor-pointer sm:px-5 md:px-10 lg:px-20">
          { !providers && <RoundSkeleton /> }
          { providers && (
                <>
                    <NavCTA
                      session={session}
                      providers={providers}
                      signIn={signIn}
                      signOut={signOut} 
                    />
                </>
              )
          }
        </div>
    </nav>
  )
}

export default NavBar