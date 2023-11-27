import React from 'react'

const Select = (props) => {
  return (
    <>
      <select {...props} className={`outline-0 bg-transparent font-light text-neutral-700 ${props.className}`}>
          {props.children}
      </select>
    </>
  )
}

export default Select
