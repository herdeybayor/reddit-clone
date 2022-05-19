import React from 'react'
import { IconType } from 'react-icons'

interface Props {
  text: string
  Icon: IconType
  active?: boolean
}

function MobileHeaderIcon({ Icon, text, active }: Props) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-end space-x-5 px-5 py-2 transition-all ${
        active ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'
      }`}
    >
      <p className="font-medium">{text}</p>
      <Icon className="h-7 w-7" />
    </div>
  )
}

export default MobileHeaderIcon
