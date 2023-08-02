"use client"

import React from 'react'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile: Function = (): React.ReactNode => {
  const router = useRouter()
  const [ posts, setPosts ] = useState([])
  const { data: session } = useSession()

  const handleDelete: Function = async (postId: any): Promise<void> => {
    const hasConfirmed = confirm('Do you want to delete this prompt')

    if (!hasConfirmed) return
    try {
      await fetch(`/api/prompt/${postId.toString()}`, {
        method: 'DELETE'
      })

      setPosts(prev => posts.filter(item => item._id.toString() !== postId.toString()))
    } catch (error) {
      console.error('Error')
    }
  }

  const handleEdit: Function = (post): void => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  
  useEffect(() => {
    if (!session?.user.id) return
    (async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    })();
  }, [ session?.user.id ])

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