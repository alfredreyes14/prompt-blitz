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
        body: {
          ...prompt,
          userId: session?.user.id
        }
      })

      if (response.ok) router.push('/')
    } catch (error) {

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