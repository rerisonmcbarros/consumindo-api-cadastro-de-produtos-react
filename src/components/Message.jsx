import React from 'react'

const Message = (props) => {
  return (
    <div {...props} className={props.className}>
      {props.children}
    </div>
  )
}

export default Message