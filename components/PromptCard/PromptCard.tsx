"use client"

import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Card } from 'flowbite-react'
import Chips from "@components/Chips"

interface PromptCardProps {
  post: any,
  handleTagClick?: Function,
  handleEdit?: Function,
  handleDelete?: Function,
  isPromptCreatedByLoggedUser: boolean
}

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  isPromptCreatedByLoggedUser = false
}: PromptCardProps): React.ReactNode => {
  const [ copied, setCopied ]: [ string, Function ] = useState('')
  const pathName: string = usePathname()

  const handleCopy: Function = (): void => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  return (
    <Card>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image || post.creator[0]?.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full" 
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{ post.creator[0]?.username || post.creator.username }</h3>
            <p className="font-inter text-sm text-gray-500">{ post.creator[0]?.email || post.creator.email }</p>
          </div>
        </div>

        <div className="copy_btn ml-10" onClick={() => handleCopy()}>
          <Image
            src={ copied === post.prompt 
              ? '/assets/icons/tick.svg' 
              : '/assets/icons/copy.svg'
            }
            alt="CTA"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <Chips tag={post.tag} />
      {/* <div className="w-5/12 relative grid select-none items-center whitespace-nowrap rounded-lg bg-orange-400 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
        { (post.tag.length > 8) ? `${post.tag.slice(0,8)}...` : post.tag }
      </div> */}
      {isPromptCreatedByLoggedUser && pathName.includes('/profile') && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={() => handleEdit()}>Edit</p>
          <p className="font-inter text-sm cursor-pointer" onClick={() => handleDelete()}>Delete</p>
        </div>
      )}
    </Card>
  )
}

export default PromptCard