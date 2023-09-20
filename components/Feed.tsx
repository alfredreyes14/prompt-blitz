"use client"

import { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react"

import PromptCard from "./PromptCard"
import { PromptType } from "@customTypes/prompt"

interface CardListProps {
  data: PromptType[],
  handleTagClick: Function
}


const Feed = (): React.ReactNode => {
  const [ searchText, setSearchText ]: [ string, Function ] = useState('')
  const [ posts, setPosts ] = useState([])

  const PromptCardList = ({ data, handleTagClick }: CardListProps) => (
    <div className="mt-16 prompt_layout">
      { data.map(item => (
        <PromptCard
          key={item._id}
          post={item}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      )) }
    </div>
  )
  
  const handleSearchChange: ChangeEventHandler = (event: ChangeEvent<Element>) => {
    setSearchText(event.target.value)
    console.log(event.target.value)
  }

  useEffect(() => {
    (async () => {
      const response: Response = await fetch('/api/prompt')
      const data: any = await response.json()

      setPosts(data)
    })();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(event: ChangeEvent) => handleSearchChange(event)}
          required
        />
      </form>

      <PromptCardList
        data={posts || []}
        handleTagClick={() => {}} 
      />
    </section>
  )
}

export default Feed