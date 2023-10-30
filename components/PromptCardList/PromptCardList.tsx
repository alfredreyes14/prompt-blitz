import React from 'react'
import PromptCard from '@components/PromptCard'
import User from '@customTypes/user'

interface PromptCardList {
  data: any[],
  handleTagClick: Function
}

const PromptCardList = ({ data, handleTagClick }: PromptCardList): React.ReactNode => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(item => (
        <PromptCard
          key={item._id}
          post={item}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
          isPromptCreatedByLoggedUser
        />
      ))}
    </div>
  )
}

export default PromptCardList