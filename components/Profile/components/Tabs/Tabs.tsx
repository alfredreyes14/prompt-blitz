import React from 'react'
import { Tabs as FlowBiteTabs } from 'flowbite-react';

type TabItem = {
  title: string,
  isActive: boolean,
  children: React.ReactNode
}

const Tabs = (): React.ReactNode => {
  const items: TabItem[] = [
    {
      title: 'Prompts',
      isActive: true,
      children: <div>Prompts</div>
    },
    {
      title: 'Favorites',
      isActive: false,
      children: <div>Faves</div>
    }
  ]

  return (
    <section className="flex flex-row justify-center mt-3">
      <FlowBiteTabs 
        aria-label="Profile tabs"
        style="underline"
      >
        {items.map(item => (
          <FlowBiteTabs.Item
            active={item.isActive}
            title={item.title}
          >
            { item.children }
          </FlowBiteTabs.Item>
        ))}
      </FlowBiteTabs>
    </section>
  )
}

export default Tabs