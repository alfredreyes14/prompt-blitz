import { PromptType } from "@customTypes/prompt"
import Link from "next/link"
import { useAppProvider } from "@context/AppProvider"

interface FormProps {
  type: string,
  post: PromptType,
  setPost: Function,
  submitting: boolean,
  handleSubmit: Function
}

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: FormProps): React.ReactNode => {
  const { previousRoute } = useAppProvider()
  const handleSetPost: Function = (value: PromptType, key: string): void => {
    setPost((prev: PromptType) => {
      return { ...prev, [key]: value}
    })
  }

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform
      </p>

      <form onSubmit={e => handleSubmit(e)} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={e => handleSetPost(e.target.value, 'prompt')} 
            placeholder="Prompt here..."
            className="form_textarea"
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={e => handleSetPost(e.target.value, 'tag')} 
            placeholder="Tag here..."
            className="form_input"
            required
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href={previousRoute || "/"}
            className="text-gray-500 text-sm" 
          >
            Cancel
          </Link>

          <button 
            type="submit" 
            disabled={submitting} 
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            { type }
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form