import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface DesktopNavProps {
  session: any,
  providers: any,
  signIn: any
}

const DesktopNav = ({ session, providers, signIn }: DesktopNavProps) => {
  return (
    <>
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div suppressHydrationWarning={true} className="flex gap-3 md:gap-5">
              <Link
                href="/create-prompt"
                className="black_btn" 
              >
                Create Post
              </Link>

              <button
                className="outline_btn"
                type="button" 
                onClick={() => {}}
              >
                Sign Out
              </button>

              <Link
                href="/profile"
              >
                <Image
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile" 
                />
              </Link>
            </div>
          ) : (
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

export default DesktopNav