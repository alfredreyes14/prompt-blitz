"use client"

import { useState } from "react"
import PromptCard from "./PromptCard"
import { UserDetails } from "@customTypes/userDetails"
import Image from 'next/image'

interface ReusableProfile {
  data: object[],
  handleEdit: Function,
  handleDelete: Function,
  userDetails?: undefined | UserDetails | null
}

const Profile = ({
  data,
  handleEdit,
  handleDelete,
  userDetails = undefined
}: ReusableProfile): React.ReactNode => {
  return (
    <section className="w-full">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div>
            <Image
              src={userDetails?.image}
              width={120}
              height={120}
              className="rounded-full ml-5"
              alt="profile-mage"
              onClick={() => {}}
            />
          </div>
          <span className="mt-2 text-2xl">{ userDetails?.username }</span>
        </div>
      </div>
      <p className="desc text-left">Prompts</p>
      <div className="prompt_layout mt-3">
        {data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {}}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post._id)} 
          />
        ))}
      </div>
    </section>
  )
}

export default Profile