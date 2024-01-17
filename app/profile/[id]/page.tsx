"use client"

import { useState, useEffect } from 'react'
import { usePathname  } from 'next/navigation'
import Profile from '@components/Profile/Profile'
import { UserDetails } from '@customTypes/userDetails'
import { SessionContextValue, useSession } from 'next-auth/react'

const OtherProfile = (): React.ReactNode => {
  const pathName: string = usePathname()
  const [ userId, setUserId ]: [ string | null, Function ] = useState(null)
  const [ userDetails, setUserDetails ]: [ UserDetails | null, Function ] = useState(null)
  const [ posts, setPosts ]: [ object[], Function ] = useState([])
  const { data: session }: SessionContextValue = useSession()

  useEffect(() => {
    setUserId(pathName.substring(pathName.lastIndexOf('/') + 1))

    return () => {
      setUserId(null)
    }
  }, [])

  useEffect(() => {
    if (!userId) return
    (async () => {
      const response: Response = await fetch(`/api/users/${userId}`)
      const data: any = await response.json()

      setUserDetails(data)
    })();

  }, [ userId, session ])

  useEffect(() => {
    if (!userDetails) return
    (async () => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json()

      setPosts(data)
    })();

  }, [ userDetails!?._id ])


  return (
    <Profile
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
      userDetails={userDetails}
    />
  )
}

export default OtherProfile