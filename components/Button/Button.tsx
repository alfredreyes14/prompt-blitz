import React from 'react'
import { Button as FlowBiteButton } from 'flowbite-react';

type CustomButtonProps = {
  [key: string]: string | boolean | React.ReactNode
}

const Button = ({ children, ...rest }: CustomButtonProps) => (
  <FlowBiteButton {...rest}>
    { children }
  </FlowBiteButton>
)

export default Button