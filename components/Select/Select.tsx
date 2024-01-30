import React from 'react'
import { Dropdown, DropdownProps } from 'flowbite-react'
import { DropdownItem } from '@customTypes/dropdownItem'

interface ExtendedDropDownProps extends DropdownProps {
  dropDownItem: DropdownItem[]
}

const Select: Function = ({ dropDownItem, ...rest }: ExtendedDropDownProps): React.ReactNode => {
  return (
    <Dropdown {...rest}>
      {
        dropDownItem.map(({ id, text, ...props}: DropdownItem) => (
          <Dropdown.Item key={id} {...props}>
            { text }
          </Dropdown.Item>
        ))
      }
    </Dropdown>
  )
}

export default Select