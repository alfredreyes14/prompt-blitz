"use client"

import { useEffect, useState } from "react"
import PromptCard from "../PromptCard"
import { UserDetails } from "@customTypes/userDetails"
import Image from 'next/image'
import Details from "./components/Details"
import { useAppProvider } from "@context/AppProvider"
import { Tabs } from 'flowbite-react';

interface ReusableProfile {
  data: object[],
  handleEdit: Function,
  handleDelete: Function,
  userDetails?: undefined | UserDetails | null
}

type ImageLinkState = [ string, Function ]

const Profile = ({
  data,
  handleEdit,
  handleDelete,
  userDetails = undefined
}: ReusableProfile): React.ReactNode => {
  const { session } = useAppProvider()
  const [ imageLink, setImageLink ]: ImageLinkState = useState('')

  useEffect(() => {
    if (!userDetails?.image) {
      setImageLink('')
      return
    }
    const link: string = userDetails?.image
    const index: number = link.lastIndexOf('=')
    setImageLink(link.slice(0, index))
  }, [ userDetails?.image ])

  return (
    <section className="w-full">
      <div className="flex flex-col items-center">
        <Image
          src={imageLink}
          width={120}
          height={120}
          className="rounded-full"
          alt="profile-mage"
          onClick={() => {}}
        />
        <span className="mt-3 text-gray-700 font-bold text-2xl">{ userDetails?.username || userDetails?.name }</span>
        <span className="text-sm text-gray-500">@username</span>
        <Details>
          <Details.BirthDay>
            <Image
              className="mr-1"
              src={'/assets/icons/birthday.svg'}
              alt="location"
              width={13}
              height={13}
            />
            <span className="text-xs">April 14, 1998</span>
          </Details.BirthDay>
          <Details.Location>
            <Image
              className="mr-1"
              src={'/assets/icons/location.svg'}
              alt="location"
              width={13}
              height={13}
            />
            <span className="text-xs">Mandaluyong, Philippines</span>
          </Details.Location>
          <Details.JoinDate>
            <Image
              className="mr-1"
              src={'/assets/icons/calendar.svg'}
              alt="location"
              width={13}
              height={13}
            />
            <span className="text-xs">June 2023</span>
          </Details.JoinDate>
        </Details>
      </div>
      {/* <p className="desc text-left">Prompts</p> */}
      {/* <div className="prompt_layout mt-3">
        {data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {}}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post._id)}
            isPromptCreatedByLoggedUser={session?.user?.id === post.creator._id}
          />
        ))}
      </div> */}
    </section>
  )
}

export default Profile