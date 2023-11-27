import React from 'react'

const Button = (props) => {
  return (
    <>
      <button {...props} className={`outline-none shadow-md py-2 rounded-md ${props.className ? props.className : ''}`}>
          {props.children}
      </button>
    </>
  )
}

export default Button
