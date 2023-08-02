"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"
import { PromptType } from "@customTypes/prompt"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

const CreatePrompt = (): React.ReactNode => {
  const { data: session } = useSession()
  const router: AppRouterInstance = useRouter()
  const [ submitting, setSubmitting ]: [boolean, Function] = useState(false)
  const [ post, setPost ]: [ PromptType, Function ] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt: Function = async (event: Event): Promise<void> => {
    event.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          ...post,
          userId: session?.user?.id
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