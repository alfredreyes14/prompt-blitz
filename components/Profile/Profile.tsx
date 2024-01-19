"use client"

import { useEffect, useState } from "react"
import PromptCard from "../PromptCard"
import { UserDetails } from "@customTypes/userDetails"
import Image from 'next/image'
import Details from "./components/Details"
import { useAppProvider } from "@context/AppProvider"
import Tabs from "./components/Tabs"
import Button from "@components/Button"

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
    <main className="w-full">
      <article className="flex flex-col items-center">
        <Image
          src={imageLink}
          width={120}
          height={120}
          className="rounded-full"
          alt="profile-mage"
          onClick={() => {}}
        />
        <p className="mt-3 text-gray-700 font-bold text-2xl">{ userDetails?.username || userDetails?.name }</p>
        <p className="text-sm text-gray-500">@username</p>
        <Details>
          <Details.BirthDay>
            <Image
              className="mr-1"
              src={'/assets/icons/birthday.svg'}
              alt="location"
              width={13}
              height={13}
            />
            <p className="text-xs">April 14, 1998</p>
          </Details.BirthDay>
          <Details.Location>
            <Image
              className="mr-1"
              src={'/assets/icons/location.svg'}
              alt="location"
              width={13}
              height={13}
            />
            <p className="text-xs">Mandaluyong, Philippines</p>
          </Details.Location>
          <Details.JoinDate>
            <Image
              className="mr-1"
              src={'/assets/icons/calendar.svg'}
              alt="location"
              width={13}
              height={13}
            />
            <p className="text-xs">June 2023</p>
          </Details.JoinDate>
        </Details>
      </article>
      <article className="flex flex-row-reverse mr-auto ml-auto w-3/4 mt-3">
        <section>
          <Button 
            gradientMonochrome="teal"
            pill
          >
            Create Prompt
          </Button>
        </section>
      </article>
      <article>
        <Tabs />
      </article>
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
    </main>
  )
}

export default Profile