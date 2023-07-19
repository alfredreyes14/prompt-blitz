"use client"

import { useState } from "react"
import PromptCard from "./PromptCard"

interface ReusableProfile {
  name: string,
  desc: string,
  data: object[],
  handleEdit: Function,
  handleDelete: Function
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete
}: ReusableProfile): React.ReactNode => {
  console.log(data)

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{ name } Profile</span>
      </h1>
      <p className="desc text-left">{ desc }</p>
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => {}}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post._id)} 
        />
      ))}
    </section>
  )
}

export default Profile