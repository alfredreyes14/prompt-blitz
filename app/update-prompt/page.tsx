"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"
import { PromptType } from "@customTypes/prompt"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

const EditPrompt: Function = (): React.ReactNode => {
  const { data: session } = useSession()
  const router: AppRouterInstance = useRouter()
  const [ submitting, setSubmitting ]: [ boolean, Function ] = useState(false)
  const [ post, setPost ]: [ PromptType, Function ] = useState({
    prompt: '',
    tag: ''
  })
  const searchParams: ReadonlyURLSearchParams = useSearchParams()
  const promptId: string | null = searchParams.get('id')

  useEffect(() => {
    (async () => {
      if (!promptId) return
      const details: Response = await fetch(`/api/prompt/${promptId}`)
      const data: PromptType = await details.json()

      setPost({ prompt: data.prompt, tag: data.tag })
    })();

    return () => {
      setPost({
        prompt: '',
        tag: ''
      })
    }
  }, [ promptId ]) 

  const updatePrompt: Function = async (event: Event): Promise<void> => {
    event.preventDefault()
    setSubmitting(true)
    if (!promptId) return

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...post
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt} 
    />
  )
}

export default EditPrompt