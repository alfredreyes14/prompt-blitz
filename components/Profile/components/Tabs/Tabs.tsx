import React from 'react'
import { Tabs as FlowBiteTabs } from 'flowbite-react';
import PromptCardList from '@components/PromptCardList';

type TabItem = {
  title: string,
  isActive: boolean,
  children: React.ReactNode
}

type TabProps = {
  data: any
}

const Tabs = ({ data }: TabProps): React.ReactNode => {
  const items: TabItem[] = [
    {
      title: 'Prompts',
      isActive: true,
      children: 
      <PromptCardList
        data={ data }
      />
    },
    {
      title: 'Favorites',
      isActive: false,
      children:
      <PromptCardList
        data={ data } 
      />
    }
  ]

  return (
    <>
      <article className="flex before:flex-row justify-center mt-3">
        <FlowBiteTabs 
          aria-label="Profile tabs"
          style="underline"
        >
          {items.map(item => (
            <FlowBiteTabs.Item
              active={item.isActive}
              title={item.title}
              key={item.title}
              className='bg-yellow-500'
            >
              { item.children }
            </FlowBiteTabs.Item>
          ))}
        </FlowBiteTabs>
      </article>
    </>
  )
}

export default Tabs