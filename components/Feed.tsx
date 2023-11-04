"use client"

import { useState, useEffect } from "react"

import PromptCardList from "./PromptCardList"
import { useAppProvider } from "@context/AppProvider"
import { usePromptActions } from "@hooks/promptActions"
import { PromptType } from "@customTypes/prompt"


const Feed = (): React.ReactNode => {
  const { 
    prompts: allLoggedUserPrompts
  } = useAppProvider()
  const [ searchText, setSearchText ] = useState('')
  const [ displayPrompts, setDisplayPrompts ] = useState(allLoggedUserPrompts)
  const abortController: AbortController = new AbortController();
  const { handleSearchPrompts } = usePromptActions()

  const fetchPrompts = async (): Promise<void> => {
    const data: PromptType[] | [] = await handleSearchPrompts(searchText)
  
    setDisplayPrompts(data)
  }

  useEffect(() => {
    if (searchText === '') {
      setDisplayPrompts(allLoggedUserPrompts)
      return
    }
    let debounce: any = null
    debounce = setTimeout(fetchPrompts, 500);
    
    return () => {
      clearTimeout(debounce)
      abortController.abort()
    }
  }, [ searchText, allLoggedUserPrompts ])

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
        data={displayPrompts}
        handleTagClick={clickTag}
      />
    </section>
  )
}

export default Feed