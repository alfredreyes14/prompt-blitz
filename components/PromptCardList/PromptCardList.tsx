import React from 'react'
import PromptCard from '@components/PromptCard'

interface PromptCardList {
  data: any[],
  handleTagClick: Function
}

const PromptCardList = ({ data, handleTagClick }: PromptCardList): React.ReactNode => {
  return (
    <div className="mt-16 prompt_layout">
      { data.map(item => (
        <PromptCard
          key={item._id}
          post={item}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      )) }
    </div>
  )
}

export default PromptCardList