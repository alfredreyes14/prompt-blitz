"use client"

import { useState, useEffect } from "react"

import PromptCardList from "./PromptCardList"
import { useAppProvider } from "@context/AppProvider"


const Feed = (): React.ReactNode => {
  const { 
    prompts: allLoggedUserPrompts, 
    searchText,
    setSearchText 
  } = useAppProvider()

  // const fetchPrompts = async () => {
  //   const response: Response = await fetch(`/api/prompt?searchText=${searchText}`)
  //   const data: any = await response.json()
  
  //   setPrompts(data)
  // }

  // useEffect(() => {
  //   if (searchText === '') {
  //     setPrompts(allLoggedUserPrompts)
  //     return
  //   }
  //   let debounce: any = null
  //   debounce = setTimeout(fetchPrompts, 500);
    
  //   return () => {
  //     clearTimeout(debounce)
  //     abortController.abort()
  //   }
  // }, [ searchText ])
  
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
        data={allLoggedUserPrompts || []}
        handleTagClick={clickTag}
      />
    </section>
  )
}

export default Feed