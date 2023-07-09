import React from 'react'
import Image from 'next/image'

interface MobileNaveProps {
  isUserLoggedIn: boolean,
  providers: any,
  signIn: any
}

const MobileNavigation = ({ isUserLoggedIn, providers, signIn }: MobileNaveProps) => {
  return (
    <>
      <div className="sm:hidden flex relative">
        {
          isUserLoggedIn
            ? (
                <div className="flex">
                  <Image
                    src="/assets/images/logo.svg"
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile" 
                  />
                </div>
              )
            : ( 
                <>
                  { providers && Object.values(providers).map((provider: any): void => {
                    <button 
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  })}
                </>
              )
        }
      </div>
    </>
  )
}

export default MobileNavigation