import React from 'react'
import "./button.scss"

export const Button = ({
    children,
    ...otherProps
    }) => {
  return (
      <button
      {...otherProps}
      >{children}</button>
  )
}
