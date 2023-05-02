import React from 'react'
import "./input.scss"

export const Input = ({ placeholder, type, onChange,onKeyDown, ...otherProps }) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                {...otherProps}
            />
        </>

    )
}
