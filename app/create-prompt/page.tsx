"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [ submitting, setSubmitting ] = useState(false)
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt = async (event: Event) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          ...post,
          userId: session?.user.id
        })
      })
      setSubmitting(false)
      if (response.ok) router.push('/')
    } catch (error) {
      setSubmitting(false)
      console.error('Error in creating prompt', error)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt} 
    />
  )
}

export default CreatePrompt