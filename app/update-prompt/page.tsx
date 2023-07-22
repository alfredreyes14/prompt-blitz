"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"

const EditPrompt = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [ submitting, setSubmitting ] = useState(false)
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  useEffect(() => {
    (async () => {
      if (!promptId) return
      const details = await fetch(`/api/prompt/${promptId}`)
      const data = await details.json()

      setPost({ prompt: data.prompt, tag: data.tag })
    })();

    return () => {
      setPost({
        prompt: '',
        tag: ''
      })
    }
  }, [ promptId ]) 

  const updatePrompt = async (event: Event) => {
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