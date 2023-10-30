"use client"

import { useState, useEffect } from "react"

import PromptCardList from "./PromptCardList"


const Feed = (): React.ReactNode => {
  const [ searchText, setSearchText ]: [ string, Function ] = useState('')
  const [ posts, setPosts ] = useState([])
  const abortController: AbortController = new AbortController();

  const fetchPrompts = async () => {
    const response: Response = await fetch(`/api/prompt?searchText=${searchText}`)
    const data: any = await response.json()
  
    setPosts(data)
  }

  useEffect(() => {
    let debounce: any = null
    debounce = setTimeout(fetchPrompts, 500);
    
    return () => {
      clearTimeout(debounce)
      abortController.abort()
    }
  }, [ searchText ])
  
  useEffect(() => {
    (async () => {
      await fetchPrompts()
    })();
  }, [])

  const clickTag = (prompt: any) => {
    console.log(prompt)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          required
        />
      </form>

      <PromptCardList
        data={posts || []}
        handleTagClick={clickTag} 
      />
    </section>
  )
}

export default Feed