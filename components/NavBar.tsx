"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

import DesktopNav from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'

const NavBar = () => {
  const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(true)
  const [ isMounted, setIsMounted ]: [boolean, Function] = useState(false)
  const [ providers, setProviders ]: [any, Function] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getProviders()

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
                  isUserLoggedIn={isUserLoggedIn}
                  providers={providers}
                  signIn={signIn}
                />
                <MobileNavigation
                  isUserLoggedIn={isUserLoggedIn}
                  providers={providers}
                  signIn={signIn}
                />
            </>
          )
        }
      </Link>
    </nav>
  )
}

export default NavBar