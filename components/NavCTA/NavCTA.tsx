import { memo, useState } from "react"
import Image from 'next/image'
import Link from 'next/link'

interface NavCTAProps {
  session: any,
  providers: any,
  signIn: Function,
  signOut: Function
}

const NavigationActions = ({
  session, 
  providers, 
  signIn, 
  signOut 
}: NavCTAProps): React.ReactNode => {
  const [ toggleDropdown, setToggleDropdown ]: [ boolean, Function ] = useState(false)

  return (
    <>
      <div className="flex relative">
        {
          session?.user
            ? (
                <div className="flex">
                  <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                    onClick={() => setToggleDropdown((prev: boolean) => !prev)}
                  />

                  {toggleDropdown && (
                    <div className="dropdown">
                      <Link 
                        href="/profile" 
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <Link 
                        href="/create-prompt" 
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                      >
                        Create Prompt
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setToggleDropdown(false)
                          signOut()
                        }}
                        className="mt-5 w-full black_btn"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )
            : (
                <>
                  { providers && Object.values(providers).map((provider: any): any => {
                    return (
                      <button 
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="black_btn"
                      >
                        Sign In
                      </button>
                    )
                  })}
                </>
              )
        }
      </div>
    </>
  )
}

const NavCTA = memo(NavigationActions)

export default NavCTA
