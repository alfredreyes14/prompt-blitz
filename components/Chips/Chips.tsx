import { memo } from 'react'

const Chips = memo(({ tag }: { tag: string }): React.ReactNode => {
  return (
    <div className="w-5/12 relative grid select-none items-center whitespace-nowrap rounded-lg bg-orange-400 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
        { (tag.length > 8) ? `${tag.slice(0,8)}...` : tag }
    </div>
  )
})

export default Chips