import React from 'react'
import { Tabs as FlowBiteTabs } from 'flowbite-react';
import type { FlowbiteTabsTheme } from 'flowbite-react';

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
      class: 'text-red-600 rounded-t-lg border-b-2 border-red-600 active dark:text-red-500 dark:border-red-500',
      children: <div>Prompts</div>
    },
    {
      title: 'Favorites',
      isActive: false,
      class: 'text-red-600 rounded-t-lg border-b-2 border-red-600 active dark:text-red-500 dark:border-red-500',
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
            className={item.class}
          >
            { item.children }
          </FlowBiteTabs.Item>
        ))}
      </FlowBiteTabs>
    </section>
  )
}

export default Tabs