"use client"

import { useEffect, useState } from "react"
import PromptCard from "../PromptCard"
import { UserDetails } from "@customTypes/userDetails"
import Image from 'next/image'
import Details from "./components/Details"
import { useAppProvider } from "@context/AppProvider"
import { HiPlusCircle  } from "react-icons/hi2"
import { Button, Dropdown } from 'flowbite-react';

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
      <article className="flex flex-col items-center gap-7 w-full px-5 py-5">
        <section className="flex flex-row-reverse gap-4 w-2/4">
          <section className="flex flex-row">
            <Button className="bg-orange-400">
              <HiPlusCircle className="mt-1 mr-1"/>
                Create Prompt
            </Button>
          </section>
          <section className="mr-6 mt-2">
          <Dropdown label="Dropdown button" dismissOnClick={false} inline>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          </section>
        </section>
        <section className="w-2/4">
          {data.map(item => (
            <PromptCard
              key={item._id}
              post={item}
              handleTagClick={() => {}}
              handleEdit={() => {}}
              handleDelete={() => {}}
              isPromptCreatedByLoggedUser
            />
          ))}
        </section>
      </article>
    </main>
  )
}

export default Profile