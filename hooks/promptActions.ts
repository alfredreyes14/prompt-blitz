import { useState } from "react"
import { useAppProvider } from "@context/AppProvider"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

export const usePromptActions = () => {
  const [ submitting, setSubmitting ]: [ boolean, Function ] = useState(false)
  const { session } = useAppProvider()
  const router: AppRouterInstance = useRouter()

  const handleSubmit: Function = async (event: Event, prompt: any, promptId: string | null = null, action: string): Promise<void> => {
    event.preventDefault()
    setSubmitting(true)
    const path = action === 'create' ? '/api/prompt/new' : `/api/prompt/${promptId}`
    const method = action === 'create' ? 'POST' : 'PATCH'

    try {
      const response = await fetch(path, {
        method,
        body: JSON.stringify({
          ...prompt,
          userId: action === 'create' ? session?.user?.id : undefined
        })
      })
      setSubmitting(false)
      if (response.ok) router.push('/')
    } catch (error) {
      setSubmitting(false)
      console.error('Error in creating prompt', error)
    }
  }

  return {
    handleSubmit,
    submitting,
    setSubmitting
  }
}