"use client"

import React from 'react'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Profile from '@components/Profile'

const MyProfile = () => {
  const handleDelete = () => {}
  const handleEdit = () => {}
  const [ posts, setPosts ] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user.id) return
    (async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    })();
  }, [ session?.user.id ])
  console.log(posts)
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile