"use client"

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const Feed = () => {
  const [ searchText, setSearchText ] = useState('')
  const [ posts, setPosts ] = useState([])

  const PromptCardList = ({ data, handleTagClick }) => (
    <div className="mt-16 prompt_layout">
      { data.map(item => (
        <PromptCard
          key={item._id}
          post={item}
          handleTagClick={handleTagClick}
        />
      )) }
    </div>
  )
  
  const handleSearchChange = e => {
    
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

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
          onChange={handleSearchChange}
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